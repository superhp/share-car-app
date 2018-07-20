using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class Request
    {
        public int RequestId { get; set; }
        public string PassengerId { get; set; }
        public string DriverId { get; set; }
        public int AddressId { get; set; }
        public Status Status { get; set; }
        
        [ForeignKey("PassengerId")]
        public UserAutentification Passenger { get; set;}
        [ForeignKey("DriverId")]
        public UserAutentification Driver { get; set; }
        [ForeignKey("AddressId")]
        public Address RequestAddress { get; set; }
    }
    public enum Status
    {
        WAITING,
        ACCEPTED,
        DENIED
    }
}
