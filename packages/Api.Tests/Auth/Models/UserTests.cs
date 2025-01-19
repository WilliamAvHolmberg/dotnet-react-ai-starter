using Api.Features.Auth.Models;
using Xunit;

namespace Api.Features.Tests.Auth.Models;

public class UserTests
{
    [Fact]
    public void User_ShouldTrackLastLogin()
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
        user.UpdateLastLogin();

        // Assert
        Assert.NotNull(user.LastLoginAt);
    }

    [Fact]
    public void User_ShouldBeActiveByDefault()
    {
        // Arrange & Act
        var user = new User
        {
            UserName = "test@example.com",
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User"
        };

        // Assert
        Assert.True(user.IsActive);
    }

    [Fact]
    public void User_ShouldHaveCreatedAtSet()
    {
        // Arrange & Act
        var user = new User
        {
            UserName = "test@example.com",
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User"
        };

        // Assert
        Assert.NotEqual(default, user.CreatedAt);
    }
} 