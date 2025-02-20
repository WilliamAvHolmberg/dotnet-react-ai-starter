using System;

namespace SoftAI.Features.Sms.Models;

public class SmsMessage
{
    public Guid Id { get; set; }
    public string To { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool Sent { get; set; }
    public string? ErrorMessage { get; set; }
} 