namespace Api.Features.SMS.Configuration;

public class ElksOptions
{
    public const string SectionName = "Elks";
    
    public string ApiUsername { get; set; } = string.Empty;
    public string ApiPassword { get; set; } = string.Empty;
} 