using Microsoft.EntityFrameworkCore;

namespace Intex.Data;

public class UserLikedDbContext : DbContext
{
    public UserLikedDbContext(DbContextOptions<UserLikedDbContext> options) : base(options){}
    
    public DbSet<User_Liked_Recommendation> User_Liked_Recommendations { get; set; }
}