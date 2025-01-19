using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Api.Features.SMS.Configuration;
using Api.Features.SMS.Models;
using Microsoft.Extensions.Options;

namespace Api.Features.SMS.Services;

public interface ISMSService
{
    Task<SendSMSResponse> SendSMSAsync(SendSMSRequest request);
}

public class SMSService : ISMSService
{
    private readonly HttpClient _httpClient;
    private readonly ElksOptions _options;

    public SMSService(HttpClient httpClient, IOptions<ElksOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
        
        var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_options.ApiUsername}:{_options.ApiPassword}"));
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        _httpClient.BaseAddress = new Uri("https://api.46elks.com/a1/");
    }

    public async Task<SendSMSResponse> SendSMSAsync(SendSMSRequest request)
    {
        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("from", request.From),
            new KeyValuePair<string, string>("to", request.To),
            new KeyValuePair<string, string>("message", request.Message),
        });

        var response = await _httpClient.PostAsync("sms", content);
        response.EnsureSuccessStatusCode();
        
        var responseString = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<SendSMSResponse>(responseString, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (result == null)
        {
            throw new InvalidOperationException("Failed to deserialize response from 46elks");
        }

        return result;
    }
} 