using Dapper.Contrib.Extensions;

namespace backend.Model
{
    [Table("KidsHeavenDB.UserRateUser")]
    public class Rating
    {
        [ExplicitKey]
        public int UserIdRated { get; set; } 
        public int UserIdEvaluated { get; set; }
        public int RatedUserStars { get; set; }
    }
}