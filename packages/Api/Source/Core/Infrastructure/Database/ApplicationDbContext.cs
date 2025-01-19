using Api.Features.Auth.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Infrastructure.Database;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>(b =>
        {
            b.Property(u => u.FirstName).IsRequired();
            b.Property(u => u.LastName).IsRequired();
            b.Property(u => u.CreatedAt).IsRequired();
        });
    }
} 