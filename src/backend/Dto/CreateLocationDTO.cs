using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class CreateLocationDTO
    {
        [Required]
        public int MapLocationsLat { get; set; }
        [Required]
        public int MapLocationsLng { get; set; }
    }
}