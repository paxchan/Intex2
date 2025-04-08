using System.Text.RegularExpressions;
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
        public IActionResult UserRec(int userId)
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
            var recommendedMovies = _savedMovieContext.movies_titles
                .Where(m => recommendedTitles.Contains(m.title))
                .ToList();

            return Ok(recommendedMovies);
        }


        [HttpGet("MovieRec")]
        public IActionResult MovieRec(string movieTitle)
        {
            // Step 1: Get top 10 recommended titles for the given movie
            var recs = _movieContext.Movie_Recommendations
                .Where(mr => mr.original_title == movieTitle)
                .OrderByDescending(mr => mr.similarity_score)
                .Take(10)
                .ToList();

            if (!recs.Any())
            {
                return NotFound("No recommendations found for this title.");
            }

            // Step 2: Extract the recommended titles
            var recommendedTitles = recs.Select(r => r.recommended_title).ToList();

            // Step 3: Query the Movie_Titles table to get full info
            var recommendedMovies = _savedMovieContext.movies_titles
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
            //exclude "release-year"
            var excluded = new[] { "release_year" };

            var genreColumns = typeof(movie_title)
                .GetProperties()
                .Where(p => p.PropertyType == typeof(int) & !excluded.Contains(p.Name)) // assuming genre columns are int
                .Select(p => p.Name)
                .ToList();

            return Ok(genreColumns);
        }

        [HttpGet("GetMoviesByGenre")]
        public async Task<IActionResult> GetMoviesByGenre(string genre, int page = 1, int pageSize = 100)
        {
            if (string.IsNullOrEmpty(genre)) return BadRequest("Genre is required.");

            var skip = (page - 1) * pageSize;

            var movies = await _savedMovieContext.movies_titles
                .Where(m => EF.Property<int>(m, genre) == 1)
                .Skip(skip)
                .Take(pageSize)
                .AsNoTracking()
                .ToListAsync();

            return Ok(movies);
        }

    }
}
