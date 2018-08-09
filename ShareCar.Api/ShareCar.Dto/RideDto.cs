using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto
{
    public class RideDto
    {
        public int RideId { get; set; }
        public int RouteId { get; set; }
        public string FromCountry { get; set; }
        public string FromCity { get; set; }
        public string FromStreet { get; set; }
        public string FromNumber { get; set; }
        public string ToCountry { get; set; }
        public string ToCity { get; set; }
        public string ToStreet { get; set; }
        public string ToNumber { get; set; }
        public string DriverEmail { get; set; }
        public string DriverFirstName { get; set; }
        public string DriverLastName { get; set; }
        public List<PassengerDto> Passengers { get; set; }
        public DateTime RideDateTime { get; set; }
        public List<RideRequestDto> Requests { get; set; }

    }
}
