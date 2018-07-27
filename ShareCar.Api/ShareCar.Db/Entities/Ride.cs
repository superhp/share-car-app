using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareCar.Db.Entities
{
    public class Ride
    {
        public int RideId { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public string DriverEmail { get; set; }
        public List<Passenger> Passengers { get; set; }
        public DateTime RideDateTime { get; set; }
        [ForeignKey("FromId")]
        public virtual Address From { get; set; }
        [ForeignKey("ToId")]
        public virtual Address To { get; set; }
    }
}
