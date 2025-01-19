using System.ComponentModel.DataAnnotations;

namespace Api.Features.UserManagement.Models;

public record UpdateUserRequest(
    [Required]
    [MinLength(2)]
    string FirstName,
    
    [Required]
    [MinLength(2)]
    string LastName,
    
    [Required]
    [EmailAddress]
    string Email,
    
    bool IsActive
); 