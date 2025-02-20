using System.ComponentModel.DataAnnotations;

namespace Api.Features.Sms.Models;

public class SendSmsRequestDto
{
    [Required]
    [MaxLength(11)]
    public string From { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\+[1-9]\d{1,14}$", ErrorMessage = "Phone number must be in E.164 format (e.g. +46700000000)")]
    public string To { get; set; } = string.Empty;

    [Required]
    [MaxLength(160)]
    public string Message { get; set; } = string.Empty;
} 