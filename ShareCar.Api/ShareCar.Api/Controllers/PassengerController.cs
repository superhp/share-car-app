using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Identity;
using System.Collections.Generic;

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
            IEnumerable<PassengerDto> passengerRides = passengerLogic.FindPassengersByEmail(email);
            if (passengerRides != null)
            {
                return Ok(passengerRides);
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
