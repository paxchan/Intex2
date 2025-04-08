using Intex.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Intex.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieRecDbContext _movieContext;
        private readonly UserRecDbContext _userContext;
        private readonly UserLikedDbContext _userLikedContext;
        private readonly MovieDbContext _savedMovieContext;

        public MovieController(
            MovieRecDbContext movieTemp,
            UserRecDbContext userTemp,
            UserLikedDbContext userLikedTemp,
            MovieDbContext savedMovieTemp)
        {
            _movieContext = movieTemp;
            _userContext = userTemp;
            _userLikedContext = userLikedTemp;
            _savedMovieContext = savedMovieTemp;
        }

        [HttpGet("UserRec")]
        public IActionResult GetUserRec(int userId)
        {
            // Step 1: Get the recommendations for this user
            var userRec = _userContext.User_Recommendations
                .FirstOrDefault(ur => ur.User == userId);

            if (userRec == null)
            {
                return NotFound("User recommendations not found.");
            }

            // Step 2: Gather the recommended titles into a list
            var recommendedTitles = new List<string>
            {
                userRec.Recommendation1,
                userRec.Recommendation2,
                userRec.Recommendation3,
                userRec.Recommendation4,
                userRec.Recommendation5,
                userRec.Recommendation6,
                userRec.Recommendation7,
                userRec.Recommendation8,
                userRec.Recommendation9,
                userRec.Recommendation10
            };

            // Step 3: Query the movie table to get full info on those titles
            var recommendedMovies = _movieContext.Movie_Titles
                .Where(m => recommendedTitles.Contains(m.Title))
                .ToList();

            return Ok(recommendedMovies);
        }


        [HttpGet("MovieRec")]
        public IActionResult GetMovieRec(string movieTitle)
        {
            // Step 1: Get the recommendation row for this movie
            var movieRec = _movieContext.Movie_Recommendations
                .FirstOrDefault(mr => mr.original_title == movieTitle);

            if (movieRec == null)
            {
                return NotFound("No recommendations found for this title.");
            }

            // Step 2: Extract all 10 recommended movie titles
            var recommendedTitles = new List<string>
            {
                movieRec.Recommendation1,
                movieRec.Recommendation2,
                movieRec.Recommendation3,
                movieRec.Recommendation4,
                movieRec.Recommendation5,
                movieRec.Recommendation6,
                movieRec.Recommendation7,
                movieRec.Recommendation8,
                movieRec.Recommendation9,
                movieRec.Recommendation10
            };

            // Step 3: Query the Movie_Titles table for full movie info
            var recommendedMovies = _movieContext.Movie_Titles
                .Where(m => recommendedTitles.Contains(m.title))
                .ToList();

            return Ok(recommendedMovies);
        }


        [HttpGet("AllMovies")]
        public async Task<IActionResult> AllMovies([FromQuery] List<string>? movieTypes)
        {
            var query = _savedMovieContext.movies_titles.AsQueryable();

            if (movieTypes != null && movieTypes.Any())
            {
                query = query.Where(m => movieTypes.Contains(m.type));
            }

            var movieList = await query
                .AsNoTracking()
                .Take(100)
                .ToListAsync();

            return Ok(movieList);
        }


        [HttpGet("GetMovieTypes")]
        public IActionResult GetMovieTypes()
        {
            var movieTypes = _savedMovieContext.movies_titles
                .Select(m => m.type)
                .Distinct()
                .ToList();
            return Ok(movieTypes);
        }
    }
}
