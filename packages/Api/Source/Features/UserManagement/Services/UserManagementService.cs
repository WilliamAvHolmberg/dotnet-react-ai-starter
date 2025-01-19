using Api.Core.Infrastructure.Database;
using Api.Features.Auth.Models;
using Api.Features.UserManagement.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.UserManagement.Services;

public class UserManagementService
{
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserManagementService> _logger;

    public UserManagementService(
        UserManager<User> userManager,
        ApplicationDbContext context,
        ILogger<UserManagementService> logger)
    {
        _userManager = userManager;
        _context = context;
        _logger = logger;
    }

    public async Task<UserListResponse> GetUsersAsync(UserListRequest request)
    {
        var query = _context.Users.AsQueryable();

        // Apply search if provided
        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.ToLower();
            query = query.Where(u => 
                u.Email.ToLower().Contains(searchTerm) ||
                u.FirstName.ToLower().Contains(searchTerm) ||
                u.LastName.ToLower().Contains(searchTerm));
        }

        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);

        var users = await query
            .OrderByDescending(u => u.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(u => new UserResponse(
                u.Id,
                u.Email!,
                u.FirstName,
                u.LastName,
                u.IsActive,
                u.CreatedAt,
                u.LastLoginAt))
            .ToListAsync();

        return new UserListResponse(
            users,
            totalCount,
            request.Page,
            request.PageSize,
            totalPages);
    }

    public async Task<UserResponse?> GetUserByIdAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return null;

        return new UserResponse(
            user.Id,
            user.Email!,
            user.FirstName,
            user.LastName,
            user.IsActive,
            user.CreatedAt,
            user.LastLoginAt);
    }

    public async Task<(bool success, IEnumerable<string> errors, string userId)> CreateUserAsync(CreateUserRequest request)
    {
        var user = new User
        {
            UserName = request.Email,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            IsActive = true,
            EmailConfirmed = true // For simplicity, we'll auto-confirm emails
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        
        if (!result.Succeeded)
        {
            _logger.LogWarning("Failed to create user {Email}: {Errors}", 
                request.Email, 
                string.Join(", ", result.Errors.Select(e => e.Description)));
            return (false, result.Errors.Select(e => e.Description), string.Empty);
        }

        _logger.LogInformation("Created user {Email}", request.Email);
        return (true, Array.Empty<string>(), user.Id);
    }

    public async Task<(bool success, IEnumerable<string> errors)> UpdateUserAsync(string id, UpdateUserRequest request)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return (false, new[] { "User not found" });
        }

        // Update email if it changed
        if (user.Email != request.Email)
        {
            var emailInUse = await _userManager.FindByEmailAsync(request.Email) != null;
            if (emailInUse)
            {
                return (false, new[] { "Email is already in use" });
            }

            user.UserName = request.Email;
            user.Email = request.Email;
        }

        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.IsActive = request.IsActive;

        var result = await _userManager.UpdateAsync(user);
        
        if (!result.Succeeded)
        {
            _logger.LogWarning("Failed to update user {Email}: {Errors}", 
                request.Email, 
                string.Join(", ", result.Errors.Select(e => e.Description)));
            return (false, result.Errors.Select(e => e.Description));
        }

        _logger.LogInformation("Updated user {Email}", request.Email);
        return (true, Array.Empty<string>());
    }

    public async Task<(bool success, IEnumerable<string> errors)> DeleteUserAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return (false, new[] { "User not found" });
        }

        // Soft delete by setting IsActive to false
        user.IsActive = false;
        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            _logger.LogWarning("Failed to delete user {Id}: {Errors}", 
                id, 
                string.Join(", ", result.Errors.Select(e => e.Description)));
            return (false, result.Errors.Select(e => e.Description));
        }

        _logger.LogInformation("Deleted user {Id}", id);
        return (true, Array.Empty<string>());
    }
} 