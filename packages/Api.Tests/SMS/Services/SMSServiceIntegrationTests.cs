using System.Net;
using Api.Features.SMS.Configuration;
using Api.Features.SMS.Models;
using Api.Features.SMS.Services;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Xunit;

namespace Api.Tests.SMS.Services;

public class SMSServiceIntegrationTests
{
    private readonly SMSService _smsService;
    private readonly HttpClient _httpClient;

    public SMSServiceIntegrationTests()
    {
        _httpClient = new HttpClient();
        var options = Options.Create(new ElksOptions 
        { 
            ApiUsername = "aaae4693d7df6a3ff21673d6871466145", 
            ApiPassword = "EAE0EAB9F1EE615D4E0D2782FB7D1607" 
        });
        _smsService = new SMSService(_httpClient, options);
    }

    [Fact]
    public async Task SendSMS_WithValidCredentials_ShouldReturnSuccessResponse()
    {
        // Arrange
        var request = new SendSMSRequest
        {
            From = "TestSMS",
            To = "+46700000000",
            Message = "Test message from integration test"
        };

        // Act
        var response = await _smsService.SendSMSAsync(request);

        // Assert
        response.Should().NotBeNull();
        response.Status.Should().Be("created");
        response.Direction.Should().Be("outgoing");
        response.From.Should().Be(request.From);
        response.To.Should().Be(request.To);
        response.Message.Should().Be(request.Message);
        response.Id.Should().NotBeNullOrEmpty();
        response.Created.Should().NotBeNullOrEmpty();
        response.Parts.Should().BeGreaterThan(0);
    }

    [Fact]
    public async Task SendSMS_WithLongMessage_ShouldSplitIntoParts()
    {
        // Arrange
        var longMessage = new string('x', 161); // Just over single SMS length
        var request = new SendSMSRequest
        {
            From = "TestSMS",
            To = "+46700000000",
            Message = longMessage
        };

        // Act
        var response = await _smsService.SendSMSAsync(request);

        // Assert
        response.Should().NotBeNull();
        response.Parts.Should().BeGreaterThan(1);
    }

    [Fact]
    public async Task SendSMS_WithInvalidCredentials_ShouldThrowUnauthorized()
    {
        // Arrange
        var invalidService = new SMSService(_httpClient, Options.Create(new ElksOptions 
        { 
            ApiUsername = "invalid", 
            ApiPassword = "invalid" 
        }));

        var request = new SendSMSRequest
        {
            From = "TestSMS",
            To = "+46700000000",
            Message = "Test message"
        };

        // Act
        var act = () => invalidService.SendSMSAsync(request);

        // Assert
        await act.Should().ThrowAsync<HttpRequestException>()
            .Where(e => e.StatusCode == HttpStatusCode.Unauthorized);
    }
} 