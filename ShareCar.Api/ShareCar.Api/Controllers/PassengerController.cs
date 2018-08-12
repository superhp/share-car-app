using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto;
using ShareCar.Logic.Passenger_Logic;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Passenger")]
    public class PassengerController : Controller
    {
        private readonly IPassengerLogic _passengerLogic;
        private readonly IUserLogic _userLogic;


        public PassengerController(IPassengerLogic passengerLogic, IUserLogic userLogic)
        {
            _passengerLogic = passengerLogic;
            _userLogic = userLogic;
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
            var users = _userLogic.GetAllUsers();
            if (passengers.Count != 0)
            {
                foreach(var passenger in passengers)
                {
                    var user = users.Single(x => x.Email == passenger.Email);
                    passenger.FirstName = user.FirstName;
                    passenger.LastName = user.LastName;
                    passenger.Phone = user.Phone;
                }
                return Ok(passengers);
            }
            else
                return NotFound("No passengers");
        }

    }
}