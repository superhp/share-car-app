using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Identity;
using ShareCar.Logic.Ride_Logic;

namespace ShareCar.Api.Controllers
{
    //[Authorize]
    [Produces("application/json")]
    [Route("api/Ride")]
    public class RideController : Controller
    {
        private readonly IRideLogic _rideLogic;
        private readonly IUserRepository _userRepository;


        public RideController(IRideLogic rideLogic, IUserRepository userRepository)
        {
            _rideLogic = rideLogic;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetRidesByLoggedUser()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            IEnumerable<RideDto> rides = _rideLogic.FindRidesByDriver(userDto.Email);
            return SendResponse(rides);
        }

        [HttpGet("ridedate={rideDate}")]
        public async Task<IActionResult> GetRidesByDate(DateTime rideDate)
        {
            IEnumerable<RideDto> rides = await _rideLogic.FindRidesByDate(rideDate, User);
            return SendResponse(rides);
        }

        [HttpGet("addressFromId={addressFromId}")]
        public async Task<IActionResult> GetRidesByStartPoint(int addressFromId)
        {
            IEnumerable<RideDto> rides = await _rideLogic.FindRidesByStartPoint(addressFromId, User);
            return SendResponse(rides);
        }

        [HttpGet("addressTo={addressTo}")]
        public IActionResult GetRidesByDestination(AddressDto addressTo)
        {
            IEnumerable<RideDto> rides = _rideLogic.FindRidesByDestination(addressTo);
            return SendResponse(rides);
        }

        [HttpGet("rideId={rideId}")]
        public IActionResult GetPassengersByRide(int rideId)
        {
            IEnumerable<PassengerDto> passengers = _rideLogic.FindPassengersByRideId(rideId);
            if (passengers.ToList().Count != 0 )
            {
                return Ok(passengers);
            }
            else
            {
                return BadRequest();
            }
        }
        // Any object update. If user doesn't change property, it should be delivered unchanged
        [HttpPut]
        public IActionResult Put([FromBody] RideDto ride)
        {
            ride = new RideDto();
            ride.RideId = 5;
            ride.FromId = 4;
            ride.ToId = 4;
            ride.Passengers = new List<PassengerDto>();
            ride.Requests = new List<RequestDto>();
            ride.DriverEmail = "e@g.com";

            if (ride == null)
            {
                return BadRequest("Invalid parameter");
            }

            bool result = _rideLogic.UpdateRide(ride);

            if(result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Operation failed");
            }

        }

        // Any object update, if user doesn't change properti, it should be delivered unchanged
        [HttpPost]
        public IActionResult Post([FromBody] RideDto ride)
        {
            if (ride == null)
            {
                return BadRequest("Invalid parameter");
            }

            bool result = _rideLogic.AddRide(ride);

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Operation failed");
            }

        }

        private IActionResult SendResponse(IEnumerable<RideDto> ride)
        {
            if (ride.Count() == 0)
            {
                return NotFound();
            }
            return Ok(ride);
        }
    }


}