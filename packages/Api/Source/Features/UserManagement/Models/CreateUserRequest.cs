using System.ComponentModel.DataAnnotations;

namespace Api.Features.UserManagement.Models;

public record CreateUserRequest(
    [Required]
    [EmailAddress]
    string Email,
    
    [Required]
    [MinLength(6)]
    string Password,
    
    [Required]
    [MinLength(2)]
    string FirstName,
    
    [Required]
    [MinLength(2)]
    string LastName
); 