using Api.Features.Auth.Models;
using Api.Core.Infrastructure.Database;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Api.Features.Tests.Auth.Integration;

public class CustomWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove existing registrations
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
            if (dbContextDescriptor != null)
            {
                services.Remove(dbContextDescriptor);
            }

            var identityDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(IdentityBuilder));
            if (identityDescriptor != null)
            {
                services.Remove(identityDescriptor);
            }

            // Add ApplicationDbContext using SQLite for testing
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlite($"Data Source=test_{Guid.NewGuid()}.db");
            });

            // Configure Identity
            services.AddIdentityCore<User>(options =>
            {
                // Relaxed password settings for testing
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders()
            .AddSignInManager();

            // Configure cookie settings
            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.None;
                options.Cookie.SameSite = SameSiteMode.Lax;
            });

            // Configure logging
            services.AddLogging(builder =>
            {
                builder.AddConsole();
                builder.SetMinimumLevel(LogLevel.Debug);
            });

            // Build the service provider.
            var sp = services.BuildServiceProvider();

            // Create a scope to obtain a reference to the database context
            using var scope = sp.CreateScope();
            var scopedServices = scope.ServiceProvider;
            var db = scopedServices.GetRequiredService<ApplicationDbContext>();
            var userManager = scopedServices.GetRequiredService<UserManager<User>>();
            var logger = scopedServices.GetRequiredService<ILogger<CustomWebApplicationFactory<TProgram>>>();

            // Create and migrate the database
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            try
            {
                // Seed the database with test data.
                SeedTestData(userManager).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred seeding the database.");
                throw;
            }
        });
    }

    private static async Task SeedTestData(UserManager<User> userManager)
    {
        var testUser = new User
        {
            UserName = "test@example.com",
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User",
            EmailConfirmed = true,
            IsActive = true
        };

        await userManager.CreateAsync(testUser, "Test123!");
    }
} 