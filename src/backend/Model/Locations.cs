using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("KidsHeavenDB.MapLocations")]
    public class Locations
    {   
        [Key]
        public int Id { get; set; }
        public float MapLocationsLat { get; set; }
        public float MapLocationsLng { get; set; }
        
    }
}