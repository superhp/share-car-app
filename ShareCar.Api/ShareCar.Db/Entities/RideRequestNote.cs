﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class RideRequestNote
    {
        public int RideRequestNoteId { get; set; }
        public string Text { get; set; }
        public string PassengerEmail { get; set; }
        [ForeignKey("PassengerEmail")]
        public User User { get; set; }
        public int RideId { get; set; }
        public Ride Ride { get; set; }
    }
}
