using Dapper.Contrib.Extensions;

namespace backend.Model
{
    [Table("KidsHeavenDB.Categories")]
    
    public class Categories
    {
        [Key]
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }
    }
}