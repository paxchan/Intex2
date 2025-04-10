﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex.Data
{
    public class movies_user
    {
        internal object movies_ratings;

        [Key]
        [Required]
        public int user_id { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public int age {  get; set; }
        public string gender { get; set; }
        public int Netflix { get; set; }
        [Column("Amazon Prime")]
        public int AmazonPrime { get; set; }
        [Column("Disney+")]
        public int DisneyPlus { get; set; }
        [Column("Paramount+")]
        public int ParamountPlus { get; set; }
        public int Max { get; set; }
        public int Hulu { get; set; }
        [Column("Apple TV+")]
        public int AppleTVPlus { get; set; }
        public int Peacock { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zip { get; set; }

    }
}
