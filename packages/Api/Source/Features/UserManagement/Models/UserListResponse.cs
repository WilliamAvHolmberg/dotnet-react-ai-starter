namespace Api.Features.UserManagement.Models;

public record UserListResponse(
    IEnumerable<UserResponse> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages
); 