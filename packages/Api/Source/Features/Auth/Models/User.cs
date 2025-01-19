using Microsoft.AspNetCore.Identity;

namespace Api.Features.Auth.Models;

public class User : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; private set; }

    public void UpdateLastLogin()
    {
        LastLoginAt = DateTime.UtcNow;
    }
} 