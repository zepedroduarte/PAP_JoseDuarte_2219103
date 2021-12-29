using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class CreateUserDto
    {
        public string FirebaseUid { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string PhoneNumber { get; set; }
        public string UserPhotoUrl { get; set; }
        [Required]
        public int DistrictId { get; set; }
    }
}