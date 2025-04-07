using Microsoft.EntityFrameworkCore;

namespace Intex.Data;

public class UserRecDbContext : DbContext
{
    public UserRecDbContext(DbContextOptions<UserRecDbContext> options) : base(options){}
    
    public DbSet<User_Recommendation> User_Recommendations { get; set; }
}