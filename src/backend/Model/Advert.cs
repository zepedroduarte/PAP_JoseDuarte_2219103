using System.ComponentModel.DataAnnotations.Schema;
using Dapper.Contrib.Extensions;

namespace backend.Model
{
    [Dapper.Contrib.Extensions.Table("KidsHeavenDB.Products")]
    
    public class Advert
    {
        [Key]
        public int ProductsId { get; set; }
        public string ProductsTitle { get; set; }
        public string ProductsGender { get; set; }
        public int ProductsCategoryId { get; set; }
        public string ProductsDescription { get; set; }
        public string ProductsEmail { get; set; }
        public string ProductsPhoneNumber { get; set; }
        public long ProductsLocationId { get; set; }
        public string ProductsPhotoUrl { get; set; }
        public int ProductsPrice { get; set; } 
        public int ProductsUserId { get; set; }
    }
}