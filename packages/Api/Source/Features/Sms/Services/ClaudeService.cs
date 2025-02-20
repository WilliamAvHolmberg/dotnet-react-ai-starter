using System.Text;
using System.Text.Json;
using Api.Features.Sms.Models;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

namespace Api.Features.Sms.Services;

public class ClaudeSettings
{
    public required string ApiKey { get; set; }
    public required string Model { get; set; }
}

public class ClaudeService
{
    private readonly HttpClient _httpClient;
    private readonly ClaudeSettings _settings;
    private readonly ILogger<ClaudeService> _logger;
    private readonly JsonSerializerOptions _jsonOptions;

    public ClaudeService(HttpClient httpClient, IOptions<ClaudeSettings> settings, ILogger<ClaudeService> logger)
    {
        _httpClient = httpClient;
        _settings = settings.Value;
        _logger = logger;
        _httpClient.BaseAddress = new Uri("https://api.anthropic.com/v1/");
        _httpClient.DefaultRequestHeaders.Add("x-api-key", _settings.ApiKey);
        _httpClient.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");

        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
        };
    }

    public async Task<SmsImproveResponseDTO> GetMessageImprovementsAsync(string message)
    {
        _logger.LogInformation("Starting message improvement request for message: {Message}", message);

        var prompt = $@"You are an expert in SMS communication. Please analyze this SMS message and provide 3 improved versions. 
Each improvement should make the message more effective while maintaining its core meaning.
Message: {message}

Please provide the response in this exact JSON format:
{{
    ""improvements"": [
        {{
            ""improved_text"": ""improved message 1"",
            ""explanation"": ""brief explanation of improvements""
        }},
        {{
            ""improved_text"": ""improved message 2"",
            ""explanation"": ""brief explanation of improvements""
        }},
        {{
            ""improved_text"": ""improved message 3"",
            ""explanation"": ""brief explanation of improvements""
        }}
    ]
}}";

        var request = new
        {
            model = _settings.Model,
            max_tokens = 1024,
            messages = new[]
            {
                new { role = "user", content = prompt }
            }
        };

        var requestJson = JsonSerializer.Serialize(request, _jsonOptions);
        _logger.LogInformation("Sending request to Claude API: {Request}", requestJson);

        var response = await _httpClient.PostAsync("messages",
            new StringContent(requestJson, Encoding.UTF8, "application/json"));

        var content = await response.Content.ReadAsStringAsync();
        _logger.LogInformation("Received response from Claude API: {Response}", content);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("Claude API returned error status code: {StatusCode}, Content: {Content}", 
                response.StatusCode, content);
            throw new Exception($"Claude API returned error: {response.StatusCode} - {content}");
        }

        ClaudeResponse? claudeResponse;
        try 
        {
            claudeResponse = JsonSerializer.Deserialize<ClaudeResponse>(content, _jsonOptions);
            _logger.LogInformation("Successfully deserialized Claude response: {Response}", 
                JsonSerializer.Serialize(claudeResponse, _jsonOptions));
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Failed to deserialize Claude response. Content: {Content}", content);
            throw new Exception($"Failed to parse Claude response: {ex.Message}. Response content: {content}");
        }

        if (claudeResponse?.Content == null || !claudeResponse.Content.Any())
        {
            _logger.LogError("Invalid Claude response - no messages found. Response: {Response}", content);
            throw new Exception($"Invalid response from Claude API - no messages found. Response: {content}");
        }

        try
        {
            var result = JsonSerializer.Deserialize<SmsImproveResponseDTO>(claudeResponse.Content[0].Text, _jsonOptions);
            if (result == null)
            {
                _logger.LogError("Failed to deserialize message content to SmsImproveResponseDTO. Content: {Content}", 
                    claudeResponse.Content[0].Text);
                throw new Exception($"Failed to parse message content. Content: {claudeResponse.Content[0].Text}");
            }
            _logger.LogInformation("Successfully generated improvements: {Improvements}", 
                JsonSerializer.Serialize(result, _jsonOptions));
            return result;
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Failed to parse message content to SmsImproveResponseDTO. Content: {Content}", 
                claudeResponse.Content[0].Text);
            throw new Exception($"Failed to parse message content: {ex.Message}. Content: {claudeResponse.Content[0].Text}");
        }
    }
}

internal class ClaudeResponse
{
    public required string Id { get; set; }
    public required string Type { get; set; }
    public required string Role { get; set; }
    public required string Model { get; set; }
    public required List<ContentItem> Content { get; set; }
    public required string StopReason { get; set; }
    public string? StopSequence { get; set; }
    public required Usage Usage { get; set; }
}

internal class ContentItem
{
    public required string Type { get; set; }
    public required string Text { get; set; }
}

internal class Usage
{
    public required int InputTokens { get; set; }
    public required int OutputTokens { get; set; }
    public required int CacheCreationInputTokens { get; set; }
    public required int CacheReadInputTokens { get; set; }
} 