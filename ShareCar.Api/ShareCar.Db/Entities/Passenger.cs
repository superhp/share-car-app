namespace ShareCar.Db.Entities
{
    public class Passenger
    {
        public string Email { get; set; }
        public User User { get; set; }
        public int RideId { get; set; }
        public Ride Ride { get; set; }
        public bool Completed{ get; set; }
    }
}
