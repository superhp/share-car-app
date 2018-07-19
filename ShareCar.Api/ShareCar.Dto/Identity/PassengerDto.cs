using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class PassengerDto
    {
        public int UserId { get; set; }
        public UserAutentification User { get; set; }
        public int RideId { get; set; }
        public Ride Ride { get; set; }
        public bool Completed{ get; set; }
    }
}
