namespace backend.Dto
{
    public class UpdateUserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber  { get; set; }
        public string UserPhotoUrl { get; set; }
        public int DistrictId { get; set; }
    }
}