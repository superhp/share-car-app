using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareCar.Db.Entities
{
    public class Ride
    {
        public int RideId { get; set; }
        public int RouteId { get; set; }
        public string DriverEmail { get; set; }
        public List<Passenger> Passengers { get; set; }
        public DateTime RideDateTime { get; set; }
        [ForeignKey("RouteId")]
        public virtual Route Route { get; set; }
    }
}
