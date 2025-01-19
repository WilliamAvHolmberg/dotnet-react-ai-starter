using Api.Features.Auth.Models;
using Microsoft.AspNetCore.Identity;

namespace Api.Features.Auth.Services;

public class AuthService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AuthService(
        UserManager<User> userManager,
        SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<(bool success, User? user)> ValidateCredentialsAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null || !user.IsActive)
            return (false, null);

        var result = await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: true);
        if (!result.Succeeded)
            return (false, null);

        // First, update the user's login time
        await UpdateLoginTimeAsync(user);

        // Create authentication properties with persistent cookie
        var authProperties = new Microsoft.AspNetCore.Authentication.AuthenticationProperties
        {
            IsPersistent = true,
            ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30)
        };

        // Sign in with the cookie
        await _signInManager.SignInAsync(user, authProperties);

        return (true, user);
    }

    private async Task UpdateLoginTimeAsync(User user)
    {
        user.UpdateLastLogin();
        await _userManager.UpdateAsync(user);
    }
} 