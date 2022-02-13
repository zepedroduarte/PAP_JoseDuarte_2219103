using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class CreateAdvertDTO
    {
        [Required]
        public string ProductsTitle { get; set; }
        [Required]
        public string ProductsGender { get; set; }
        [Required]
        public int ProductsCategoryId { get; set; }
        [Required]
        public string ProductsDescription { get; set; }
        [Required]
        public string ProductsEmail { get; set; }
        [Required]
        public string ProductsPhoneNumber { get; set; }
        [Required]
        public float lat { get; set; }
        [Required]
        public float lng { get; set; }
        [Required]
        public string ProductsPhotoUrl { get; set; }
        [Required]
        public int ProductsPrice { get; set; } 
        [Required]
        public int ProductsUserId { get; set; }
    }
}