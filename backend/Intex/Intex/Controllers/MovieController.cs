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
            var userRec = _userContext.User_Recommendations
            var userRec = _userContext.User_Recommendations
                .Where(ur => ur.User == userId)
                .ToList();

            return Ok(userRec);
        }

        [HttpGet("MovieRec")]
        public IActionResult GetMovieRec(string movieTitle)
        {
            var movieRec = _movieContext.Movie_Recommendations
                .Where(mr => mr.original_title == movieTitle)
                .ToList();
            return Ok(movieRec);
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
