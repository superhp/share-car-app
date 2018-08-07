namespace ShareCar.Dto.Identity
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }
        public string Email { get; set; }
        public string LicensePlate { get; set; }
        public string Phone { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string SecurityStamp { get; set; }
    }
}