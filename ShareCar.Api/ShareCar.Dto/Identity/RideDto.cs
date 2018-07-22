using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShareCar.Dto.Identity
{
    public class RideDto
    {
        public int RideId { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public string DriverEmail { get; set; }
        public List<PassengerDto> Passengers { get; set; }
        public DateTime RideDateTime { get; set; }
        public List<RequestDto> Requests { get; set; }

    }
}
