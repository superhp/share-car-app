using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class Passenger
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int RideId { get; set; }
        public Ride Ride { get; set; }
        public bool Completed{ get; set; }
    }
}
