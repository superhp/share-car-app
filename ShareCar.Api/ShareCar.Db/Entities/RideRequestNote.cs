using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class RideRequestNote
    {
        public int RideRequestNoteId { get; set; }
        public string Text { get; set; }
        public string Email { get; set; }
        public User User { get; set; }
        public int RideId { get; set; }
        public Ride Ride { get; set; }
    }
}
