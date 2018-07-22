using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto.Identity
{
    public class PassengerDto
    {
        public string Email { get; set; }
        public PersonDto Person { get; set; }
        public int RideId { get; set; }
        public RideDto Ride { get; set; }
        public bool Completed { get; set; }
    }
}
