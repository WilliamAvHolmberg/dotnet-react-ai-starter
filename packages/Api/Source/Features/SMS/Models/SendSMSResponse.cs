namespace Api.Features.SMS.Models;

public class SendSMSResponse
{
    public string Status { get; set; } = string.Empty;
    public string Direction { get; set; } = string.Empty;
    public string From { get; set; } = string.Empty;
    public string Created { get; set; } = string.Empty;
    public int Parts { get; set; }
    public string To { get; set; } = string.Empty;
    public int Cost { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Id { get; set; } = string.Empty;
} 