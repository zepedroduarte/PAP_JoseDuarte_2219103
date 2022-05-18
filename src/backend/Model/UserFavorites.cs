using Dapper.Contrib.Extensions;

namespace backend.Model
{
    [Table("KidsHeavenDB.UserHasFavoriteProduct")]
    public class UserFavorites
    {
        [ExplicitKey]
        public int ProductId { get; set; }

        public int UserId { get; set; }
    }
}