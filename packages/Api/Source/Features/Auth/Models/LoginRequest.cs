using System.ComponentModel.DataAnnotations;

namespace Api.Features.Auth.Models;

public record LoginRequest(
    [Required]
    [EmailAddress]
    string Email,
    
    [Required]
    [MinLength(6)]
    string Password
); 