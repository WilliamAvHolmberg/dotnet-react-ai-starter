using Api.Features.Auth.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace Api.Features.Auth.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        ILogger<AuthController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            _logger.LogInformation("Login attempt for user {Email}", request.Email);
            _logger.LogInformation("User details: {@User}, Request: {@Request}", user, request);
            if (user == null || !user.IsActive)
            {
                return Unauthorized(new { message = "Invalid creds" });
            }

            var result = await _signInManager.PasswordSignInAsync(
                user, 
                request.Password, 
                isPersistent: true, 
                lockoutOnFailure: true);

            if (!result.Succeeded)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var response = new LoginResponse(user.Email, user.FirstName, user.LastName);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        try
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during logout");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<UserProfileResponse>> GetCurrentUser()
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            var response = new UserProfileResponse(
                user.Id,
                user.Email!,
                user.FirstName,
                user.LastName,
                user.IsActive,
                user.CreatedAt,
                user.LastLoginAt
            );
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting current user");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }
} 