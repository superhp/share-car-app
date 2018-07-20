using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class Passenger
    {
        public string Email { get; set; }
        public Person Person { get; set; }
        public int RideId { get; set; }
        public Ride Ride { get; set; }
        public bool Completed{ get; set; }
    }
}
