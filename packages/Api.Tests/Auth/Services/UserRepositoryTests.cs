using Api.Features.Auth.Models;
using Api.Features.Auth.Services;
using Api.Core.Infrastructure.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Xunit;

namespace Api.Features.Tests.Auth.Services;

public class UserTests : IDisposable
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;

    public UserTests()
    {
        var services = new ServiceCollection();
        
        // Set up SQLite database
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite($"Data Source=test_{Guid.NewGuid()}.db"));

        // Configure logging
        services.AddLogging(builder =>
        {
            builder.AddConsole();
            builder.SetMinimumLevel(LogLevel.Debug);
        });

        // Set up Identity
        services.AddIdentity<User, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        var serviceProvider = services.BuildServiceProvider();
        _context = serviceProvider.GetRequiredService<ApplicationDbContext>();
        _userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        // Ensure database is created
        _context.Database.EnsureCreated();
    }

    [Fact]
    public async Task CreateUser_ShouldPersistUser()
    {
        // Arrange
        var user = new User
        {
            UserName = "test@example.com",
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User"
        };

        // Act
        var result = await _userManager.CreateAsync(user, "Password123!");

        // Assert
        Assert.True(result.Succeeded);
        var savedUser = await _userManager.FindByEmailAsync(user.Email);
        Assert.NotNull(savedUser);
        Assert.Equal(user.Email, savedUser.Email);
        Assert.Equal(user.FirstName, savedUser.FirstName);
        Assert.Equal(user.LastName, savedUser.LastName);
    }

    [Fact]
    public async Task GetByEmail_ShouldReturnUser()
    {
        // Arrange
        var user = new User
        {
            UserName = "test@example.com",
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User"
        };
        await _userManager.CreateAsync(user, "Password123!");

        // Act
        var foundUser = await _userManager.FindByEmailAsync(user.Email);

        // Assert
        Assert.NotNull(foundUser);
        Assert.Equal(user.Email, foundUser.Email);
    }

    [Fact]
    public async Task GetByEmail_WithNonexistentEmail_ShouldReturnNull()
    {
        // Act
        var user = await _userManager.FindByEmailAsync("nonexistent@example.com");

        // Assert
        Assert.Null(user);
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }
} 