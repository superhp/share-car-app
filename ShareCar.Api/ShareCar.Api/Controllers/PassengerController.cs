using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto;
using ShareCar.Logic.Passenger_Logic;

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Passenger")]
    public class PassengerController : Controller
    {
        private readonly IPassengerLogic _passengerLogic;

        public PassengerController(IPassengerLogic passengerLogic)
        {
            _passengerLogic = passengerLogic;
        }

        [HttpPost]
        public IActionResult RideCompleted([FromBody] PassengerDto passenger)
        {

            return Ok();
        }

        [HttpGet("rideId={rideId}")]
        public IActionResult GetPassengersByRide(int rideId)
        {
            var passengers = _passengerLogic.GetPassengersByRideId(rideId);
            if (passengers.Count != 0)
                return Ok(passengers);
            else
                return BadRequest("No passengers");
        }

    }
}