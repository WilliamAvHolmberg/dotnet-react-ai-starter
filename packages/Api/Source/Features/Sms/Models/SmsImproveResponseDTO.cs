namespace Api.Features.Sms.Models;

public class SmsImproveResponseDTO
{
    public required List<SmsImprovement> Improvements { get; set; }
}

public class SmsImprovement
{
    public required string ImprovedText { get; set; }
    public required string Explanation { get; set; }
} 