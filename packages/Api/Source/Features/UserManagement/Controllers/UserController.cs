using Api.Features.UserManagement.Models;
using Api.Features.UserManagement.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Api.Features.Auth.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.UserManagement.Controllers;

[ApiController]
[Route("api/users")]
[Authorize] // Require authentication for all endpoints
public class UserController : ControllerBase
{
    private readonly UserManagementService _userService;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<UserController> _logger;

    public UserController(
        UserManagementService userService,
        UserManager<User> userManager,
        ILogger<UserController> logger)
    {
        _userService = userService;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<UserListResponse>> GetUsers([FromQuery] UserListRequest request)
    {
        try
        {
            var response = await _userService.GetUsersAsync(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting users");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponse>> GetUser(string id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user {Id}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPost]
    public async Task<ActionResult<UserResponse>> CreateUser(CreateUserRequest request)
    {
        try
        {
            var (success, errors, userId) = await _userService.CreateUserAsync(request);
            if (!success)
            {
                return BadRequest(new { message = "Failed to create user", errors });
            }

            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                _logger.LogError("Created user not found with ID {UserId}", userId);
                return StatusCode(500, new { message = "User created but failed to retrieve details" });
            }

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser(string id, UpdateUserRequest request)
    {
        try
        {
            var (success, errors) = await _userService.UpdateUserAsync(id, request);
            if (!success)
            {
                return BadRequest(new { message = "Failed to update user", errors });
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user {Id}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(string id)
    {
        try
        {
            var (success, errors) = await _userService.DeleteUserAsync(id);
            if (!success)
            {
                return BadRequest(new { message = "Failed to delete user", errors });
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting user {Id}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPost("seed")]
    [AllowAnonymous] // Explicitly allow anonymous access to this endpoint
    public async Task<ActionResult> SeedDefaultUser()
    {
        try
        {
            if (await _userManager.Users.AnyAsync())
            {
                return BadRequest(new { message = "Users already exist in the database" });
            }

            var defaultUser = new User
            {
                UserName = "test@example.com",
                Email = "test@example.com",
                FirstName = "Test",
                LastName = "User",
                EmailConfirmed = true,
                IsActive = true
            };

            var result = await _userManager.CreateAsync(defaultUser, "Test123!");
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to create default user", errors = result.Errors });
            }

            return Ok(new { message = "Default user created successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error seeding default user");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }
} 