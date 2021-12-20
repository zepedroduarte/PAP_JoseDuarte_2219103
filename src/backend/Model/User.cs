using Dapper.Contrib.Extensions;

namespace backend.Model
{
    [Table("KidsHeavenDB.UserAccounts")]
    
    public class User
    {
        public int Id;
        
        public int FirebaseUid;
        
        public string UserName;
        
        public string Email;
        
        public string Password;
        
        public string PhoneNumber;
        
        public string UserPhotoUrl;
        
        public int UserDistrictId;
    }
}