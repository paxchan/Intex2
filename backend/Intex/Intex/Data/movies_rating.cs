using System.ComponentModel.DataAnnotations;

namespace Intex.Data
{
    public class movies_rating
    {

        public int user_id { get; set; }

        public string show_id { get; set; }
        public int rating { get; set; }

             // Navigation properties (if applicable)
        public movies_user movies_user { get; set; }
        public movie_title movie_title { get; set; }

    }
}
