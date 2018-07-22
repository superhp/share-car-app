using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

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
        public List<Request> Requests { get; set; }
        [ForeignKey("FromId")]
        public Address From { get; set; }
        [ForeignKey("ToId")]
        public Address To { get; set; }
    }
}
