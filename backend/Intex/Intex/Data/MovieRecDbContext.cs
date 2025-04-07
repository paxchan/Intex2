using Microsoft.EntityFrameworkCore;

namespace Intex.Data;

public class MovieRecDbContext : DbContext
{
    public MovieRecDbContext(DbContextOptions<MovieRecDbContext> options) : base(options){}
    
    public DbSet<Movie_Recommendation> Movie_Recommendations { get; set; }
}