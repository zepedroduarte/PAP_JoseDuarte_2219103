using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class UserInfoDTO
    {
        public long UserId { get; set; }
        
        public string UserFirebaseUid { get; set; }

        public string UserName { get; set; }

        public string UserEmail { get; set; }
        
        public string UserPhoneNumber { get; set; }
        
        public string UserPhotoUrl { get; set; }
        
        public long DistrictId { get; set; }
        
        public string DistrictName { get; set; }
    }
}