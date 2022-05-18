using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class UserFavoriteAdvertsDTO
    {
        public int ProductsId { get; set; }
        public int ProductsPrice { get; set; }
        public string ProductsTitle { get; set; }
        public string ProductsPhotoUrl { get; set; }
        public int ProductsUserId { get; set; }
    }
}