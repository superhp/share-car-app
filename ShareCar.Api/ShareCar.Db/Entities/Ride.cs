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
        public int DriverId { get; set; }
        public List<User> Passenger { get; set; }
        public DateTime DateTime { get; set; }
        public List<Request> Requests { get; set; }
        [ForeignKey("FromId")]
        public Address FromAddress { get; set; }
        [ForeignKey("ToId")]
        public Address ToAddress { get; set; }
    }
}
