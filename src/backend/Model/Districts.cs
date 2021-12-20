using Dapper.Contrib.Extensions;

namespace backend.Model
{
    [Table("KidsHeavenDB.Districts")]
    
    public class Districts
    {
        [Key]
        public int DistrictsId { get; set; }

        public string DistrictName { get; set; }
    }
}