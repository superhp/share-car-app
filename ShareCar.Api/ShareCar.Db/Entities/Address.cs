using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class Address
    {
        public int AddressId { get; set; }
        public string Country { get; set; }
        public int City { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public double Longtitude { get; set; }
        public double Latitude { get; set; }
    }
}
