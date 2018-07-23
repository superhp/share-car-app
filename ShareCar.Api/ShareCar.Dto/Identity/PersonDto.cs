//using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto.Identity
{
    public class PersonDto
    {
        public string Email { get; set; }
        public List<RideDto> Ride { get; set; }

    }
}
