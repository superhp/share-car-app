using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto
{
    public class RouteDto
    {
        public int RouteId { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public string Geometry { get; set; }
        public List<RideDto> Rides { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime UntillTime { get; set; }
        public AddressDto AddressFrom { get; set; }
        public AddressDto AddressTo { get; set; }
    }
}
