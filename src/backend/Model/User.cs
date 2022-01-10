using Dapper.Contrib.Extensions;

namespace backend.Model
{
    [Table("KidsHeavenDB.UserAccounts")]
    
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserFirebaseUid { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPhoneNumber { get; set; }
        public string UserPhotoUrl { get; set; }
        public int DistrictId { get; set; }
    } 
}