namespace Api.Features.Auth.Models;

public record UserProfileResponse(
    string Id,
    string Email,
    string FirstName,
    string LastName,
    bool IsActive,
    DateTime CreatedAt,
    DateTime? LastLoginAt
); 