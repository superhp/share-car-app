namespace ShareCar.Dto.Identity
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }
        public string Email { get; set; }
    }
}