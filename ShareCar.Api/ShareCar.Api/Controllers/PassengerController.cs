using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareCar.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Passenger")]
    public class PassengerController : Controller
    {
        private readonly IPassengerLogic passengerLogic;

        [HttpGet]
        public IActionResult GetPassengersByEmail(string email)
        {
            IEnumerable<PassengerDto> passengers = passengerLogic.FindPassengersByEmail(email);
            if (passengers != null)
            {
                return Ok(passengers);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetPassengersByRide(int rideId)
        {
            IEnumerable<PassengerDto> passengers = passengerLogic.FindPassengersByRideId(rideId);
            if (passengers != null)
            {
                return Ok(passengers);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
