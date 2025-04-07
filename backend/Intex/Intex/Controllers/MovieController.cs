using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intex.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {

        private MovieRecDbContext _movieContext;
        public MovieController(MovieRecDbContext temp)
        {
            _movieContext = temp;
        }

        private UserRecDbContext _userContext;
        public MovieController(UserRecDbContext temp)
        {
            _userContext = temp;
        }

        private UserLikedDbContext _userLikedContext;
        public MovieController(UserLikedDbContext temp)
        {
            _userLikedContext = temp;
        }
    
        [HttpGet("UserRec")]
        public IActionResult GetUserRec(int userId)
        {
            var userRec = _movieContext.User_Recommendations
                .Where(ur => ur.User == userId)
                .ToList();

            return Ok(userRec);
        }

        [HttpGet("MovieRec")]
        public IActionResult GetMovieRec(string movieTitle){
            var movieRec = _movieContext.Movie_Recommendations
                .Where(mr => mr.original_title == movieTitle)
                .ToList();
        }
    }
}
