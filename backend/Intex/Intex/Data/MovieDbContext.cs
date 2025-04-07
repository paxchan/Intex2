using Microsoft.EntityFrameworkCore;

namespace Intex.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options)
            : base(options)
        {   
        }

        public DbSet<movies_rating> MoviesRatings { get; set; }
    }
}
