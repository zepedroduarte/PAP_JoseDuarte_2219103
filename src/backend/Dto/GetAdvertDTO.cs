namespace backend.Dto
{
    public class GetAdvertDTO
    {
        public string ProductsTitle { get; set; }
     
        public string ProductsGender { get; set; }
     
        public string CategoryName { get; set; }
   
        public string ProductsDescription { get; set; }
      
        public string ProductsEmail { get; set; }
     
        public string ProductsPhoneNumber { get; set; }
      
        public float MapLocationLat { get; set; }
        
        public float MapLocationLng { get; set; }
       
        public string ProductsPhotoUrl { get; set; }
        
        public int ProductsPrice { get; set; } 
   
        public int ProductsUserId { get; set; }
    }
}