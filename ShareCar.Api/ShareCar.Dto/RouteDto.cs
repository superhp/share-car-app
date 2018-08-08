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
        public List<RideDto> Rides { get; set; }
        public string Geometry { get; set; }

    }
}
