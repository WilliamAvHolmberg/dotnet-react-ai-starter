using System.ComponentModel.DataAnnotations;

namespace Api.Features.SMS.Models;

public class SendSMSRequest
{
    [Required]
    [RegularExpression(@"^\+[1-9]\d{8,14}$", ErrorMessage = "Phone number must be in E.164 format (e.g. +46700000000) and have at least 9 digits")]
    public string To { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^(?:[a-zA-Z][a-zA-Z0-9]{0,10}|\+[1-9]\d{8,14})$", ErrorMessage = "From must be either alphanumeric (starting with a letter, max 11 chars) or a phone number in E.164 format")]
    public string From { get; set; } = string.Empty;

    [Required]
    [StringLength(1600, ErrorMessage = "Message cannot exceed 1600 characters")]
    public string Message { get; set; } = string.Empty;
} 