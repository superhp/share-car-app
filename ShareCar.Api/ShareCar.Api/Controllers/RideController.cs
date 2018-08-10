using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Dto;
using ShareCar.Logic.Passenger_Logic;
using ShareCar.Logic.Ride_Logic;
using ShareCar.Logic.Route_Logic;

namespace ShareCar.Api.Controllers
{   
    [Authorize]
    [Produces("application/json")]
    [Route("api/Ride")]
    public class RideController : Controller
    {
        private readonly IRideLogic _rideLogic;
        private readonly IRouteLogic _routeLogic;
        private readonly IUserRepository _userRepository;
        private readonly IPassengerLogic _passengerLogic;

        public RideController(IRideLogic rideLogic, IRouteLogic routeLogic, IUserRepository userRepository, IPassengerLogic passengerLogic)
        {
            _rideLogic = rideLogic;
            _routeLogic = routeLogic;
            _userRepository = userRepository;
            _passengerLogic = passengerLogic;
        }
        [HttpGet("simillarRides={rideId}")]
        public IActionResult GetSimillarRides(int rideId)
        {
            IEnumerable<RideDto> rides = _rideLogic.FindSimilarRides(rideId);
            return SendResponse(rides);
        }

        [HttpPost("passengerResponse")]
        public async Task PassengerResponseAsync(bool response, int rideId)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);

            _passengerLogic.RespondToRide(response, rideId, userDto.Email);
        }

        [HttpGet("checkFinished")]
        public async Task<IActionResult> CheckForFinishedRidesAsync()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            List<RideDto> rides = await _rideLogic.FindFinishedPassengerRidesAsync(userDto.Email);
            return Ok(rides);
        }

        // Should pass users role
        [HttpGet]
        public async Task<IActionResult> GetRidesByLoggedUser()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            IEnumerable<RideDto> rides = _rideLogic.FindRidesByDriver(userDto.Email);
            return SendResponse(rides);
        }

        [HttpGet("ridedate={rideDate}")]
        public  IActionResult GetRidesByDate(DateTime rideDate)
        {
            IEnumerable<RideDto> rides =  _rideLogic.FindRidesByDate(rideDate);
            return SendResponse(rides);
        }

        [HttpGet("addressFromId={addressFromId}")]
        public  IActionResult GetRidesByStartPoint(int addressFromId)
        {
            IEnumerable<RideDto> rides =  _rideLogic.FindRidesByStartPoint(addressFromId);
            return SendResponse(rides);
        }

        [HttpGet("addressToId={addressToId}")]
        public  IActionResult GetRidesByDestination(int addressToId)
        {
            IEnumerable<RideDto> rides =  _rideLogic.FindRidesByDestination(addressToId);
            return SendResponse(rides);
        }

        [HttpGet("ridesByRoute={routeGeometry}")]
        public IActionResult GetRidesRoute(string routeGeometry)
        {
            IEnumerable<RideDto> rides = _rideLogic.GetRidesByRoute(routeGeometry);
            return Ok(rides);
        }

        [HttpGet("routes")]
        public IActionResult GetRoutes(RouteDto routeDto)
        {
            IEnumerable<RouteDto> routes = _rideLogic.GetRoutes(routeDto);
            return Ok(routes);
        }

        [HttpGet("rideId={rideId}")]
        public async Task<IActionResult> GetPassengersByRideAsync(int rideId)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            if (!_rideLogic.DoesUserBelongsToRide(userDto.Email, rideId))
            {
                BadRequest("You don't belong to this ride");
            }


            IEnumerable<PassengerDto> passengers =  _rideLogic.FindPassengersByRideId(rideId);
            if (passengers.ToList().Any())
            {
                return Ok(passengers);
            }
            else
            {
                return NotFound();
            }
        }
        /*
        [HttpGet]
        [Route("passengerRides")]
        public async Task<IActionResult> GetRidesByPassenger()
        {
            IEnumerable<PassengerDto> passengerRides = await _rideLogic.FindRidesByPassenger(User);
            
                return Ok(passengerRides);            

        }
        */


        // Any object update. If user doesn't change property, it should be delivered unchanged
        [HttpPut]
        public IActionResult Put([FromBody] RideDto ride)
        {
            if (ride == null)
            {
                return BadRequest("Invalid parameter");
            }

            
                return Ok();
            

        }
        [HttpPut("disactivate")]
        public async Task<IActionResult> SetRideAsInactive([FromBody] RideDto rideDto)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            if (rideDto == null)
            {
                return BadRequest("invalid parameter");

            }
            bool result = _rideLogic.SetRideAsInactive(rideDto);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("operation failed");
            }

        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RideDto ride)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            if (ride == null)
            {
                return BadRequest("Invalid parameter");
            }

            bool result =  _rideLogic.AddRide(ride, userDto.Email);

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
            if (ride.Any())
            {
                return Ok(ride);

            }
            return NotFound();

        }
    }


}