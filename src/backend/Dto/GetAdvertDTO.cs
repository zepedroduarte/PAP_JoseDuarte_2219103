﻿namespace backend.Dto
{
    public class GetAdvertDTO
    {
        public int ProductsId { get; set; }
        
        public string ProductsTitle { get; set; }
     
        public string ProductsGender { get; set; }
     
        public string CategoryName { get; set; }
   
        public string ProductsDescription { get; set; }
      
        public string ProductsEmail { get; set; }
     
        public string ProductsPhoneNumber { get; set; }
      
        public float MapLocationsLat { get; set; }
        
        public float MapLocationsLng { get; set; }
       
        public string ProductsPhotoUrl { get; set; }
        
        public int ProductsPrice { get; set; }
    }
}