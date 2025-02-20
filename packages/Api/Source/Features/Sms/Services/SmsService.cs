using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Api.Core.Infrastructure.Database;
using Api.Features.Sms.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SoftAI.Features.Sms.Models;

namespace Api.Features.Sms.Services;

public class SmsService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _dbContext;

    public SmsService(HttpClient httpClient, IConfiguration configuration, ApplicationDbContext dbContext)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _dbContext = dbContext;
    }

    public async Task<SendSmsResponseDto> SendSmsAsync(SendSmsRequestDto request)
    {
        var username = _configuration["ElksSettings:ApiUsername"] ?? throw new InvalidOperationException("46elks API username not configured");
        var password = _configuration["ElksSettings:ApiPassword"] ?? throw new InvalidOperationException("46elks API password not configured");

        var auth = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", auth);

        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("from", request.From),
            new KeyValuePair<string, string>("to", request.To),
            new KeyValuePair<string, string>("message", request.Message),
        });

        try
        {
            var response = await _httpClient.PostAsync("https://api.46elks.com/a1/sms", content);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<SendSmsResponseDto>()
                        ?? throw new InvalidOperationException("Failed to deserialize response");

            // Store the message
            var smsMessage = new SmsMessage
            {
                Id = Guid.NewGuid(),
                To = request.To,
                Message = request.Message,
                CreatedAt = DateTime.UtcNow,
                Sent = true
            };

            _dbContext.SmsMessages.Add(smsMessage);
            await _dbContext.SaveChangesAsync();

            return result;
        }
        catch (Exception ex)
        {
            // Store failed message
            var smsMessage = new SmsMessage
            {
                Id = Guid.NewGuid(),
                To = request.To,
                Message = request.Message,
                CreatedAt = DateTime.UtcNow,
                Sent = false,
                ErrorMessage = ex.Message
            };

            _dbContext.SmsMessages.Add(smsMessage);
            await _dbContext.SaveChangesAsync();

            throw;
        }
    }

    public async Task<List<SmsMessageResponseDto>> GetSmsHistoryAsync()
    {
        var messages = await _dbContext.SmsMessages
            .OrderByDescending(m => m.CreatedAt)
            .Select(m => new SmsMessageResponseDto
            {
                Id = m.Id,
                To = m.To,
                Message = m.Message,
                CreatedAt = m.CreatedAt,
                Sent = m.Sent,
                ErrorMessage = m.ErrorMessage
            })
            .ToListAsync();

        return messages;
    }
} 