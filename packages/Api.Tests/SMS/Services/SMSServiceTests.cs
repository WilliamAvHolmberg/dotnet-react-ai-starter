using System.ComponentModel.DataAnnotations;
using Api.Features.SMS.Models;
using FluentAssertions;
using Xunit;

namespace Api.Tests.SMS.Services;

public class SMSServiceTests
{
    [Theory]
    [InlineData("Company123", true)]  // Valid alphanumeric
    [InlineData("Comp@ny", false)]    // Invalid special character
    [InlineData("TooLongName12", false)] // 12 chars (max is 11)
    [InlineData("+46700000000", true)]  // Valid E.164
    [InlineData("46700000000", false)]  // Missing + prefix
    [InlineData("+1234", false)]        // Too short
    [InlineData("123456789", false)]    // Numeric but not E.164
    public void ValidateFrom_ShouldValidateCorrectly(string from, bool shouldBeValid)
    {
        // Arrange
        var request = new SendSMSRequest { From = from, To = "+46700000000", Message = "Test" };
        var context = new ValidationContext(request);
        var results = new List<ValidationResult>();

        // Act
        var isValid = Validator.TryValidateObject(request, context, results, validateAllProperties: true);

        // Assert
        isValid.Should().Be(shouldBeValid);
        if (!shouldBeValid)
        {
            results.Should().Contain(r => r.MemberNames.Contains("From"));
        }
    }

    [Theory]
    [InlineData("+46700000000", true)]   // Valid Swedish number
    [InlineData("+12125550123", true)]   // Valid US number
    [InlineData("46700000000", false)]   // Missing + prefix
    [InlineData("+123", false)]          // Too short
    [InlineData("NotANumber", false)]    // Not a number
    [InlineData("+46700ABC000", false)]  // Contains letters
    public void ValidateTo_ShouldValidateCorrectly(string to, bool shouldBeValid)
    {
        // Arrange
        var request = new SendSMSRequest { From = "Company", To = to, Message = "Test" };
        var context = new ValidationContext(request);
        var results = new List<ValidationResult>();

        // Act
        var isValid = Validator.TryValidateObject(request, context, results, true);

        // Assert
        isValid.Should().Be(shouldBeValid);
        if (!shouldBeValid)
        {
            results.Should().Contain(r => r.MemberNames.Contains("To"));
        }
    }

    [Theory]
    [InlineData("Company", "+46700000000", "Test message", true)]
    [InlineData("", "+46700000000", "Test message", false)]      // Empty from
    [InlineData("Company", "", "Test message", false)]           // Empty to
    [InlineData("Company", "+46700000000", "", false)]          // Empty message
    [InlineData("C0mp@ny!", "+46700000000", "Test", false)]     // Invalid from
    [InlineData("Company", "46700000000", "Test", false)]       // Invalid to
    public void ValidateRequest_ShouldValidateAllFields(string from, string to, string message, bool shouldBeValid)
    {
        // Arrange
        var request = new SendSMSRequest { From = from, To = to, Message = message };
        var context = new ValidationContext(request);
        var results = new List<ValidationResult>();

        // Act
        var isValid = Validator.TryValidateObject(request, context, results, true);

        // Assert
        isValid.Should().Be(shouldBeValid);
    }
} 