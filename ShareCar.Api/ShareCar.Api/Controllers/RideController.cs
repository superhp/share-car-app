using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Db.Repositories.User_Repository;
using ShareCar.Dto;
using ShareCar.Logic.Address_Logic;
using ShareCar.Logic.Passenger_Logic;
using ShareCar.Logic.Ride_Logic;
using ShareCar.Logic.RideRequest_Logic;
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
        private readonly IRideRequestLogic _rideRequestLogic;
        private readonly IUserRepository _userRepository;
        private readonly IPassengerLogic _passengerLogic;
        private readonly IAddressLogic _addressLogic;

        public RideController(IAddressLogic addressLogic, IRideRequestLogic rideRequestLogic, IRideLogic rideLogic, IRouteLogic routeLogic, IUserRepository userRepository, IPassengerLogic passengerLogic)
        {
            _addressLogic = addressLogic;
            _rideLogic = rideLogic;
            _rideRequestLogic = rideRequestLogic;
            _routeLogic = routeLogic;
            _userRepository = userRepository;
            _passengerLogic = passengerLogic;
        }
 
        [HttpPost("passengerResponse")]
        public async Task PassengerResponseAsync([FromBody]PassengerResponseDto response)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);

            _passengerLogic.RespondToRide(response.Response, response.RideId, userDto.Email);
        }

        [HttpGet("checkFinished")]
        public async Task<IActionResult> CheckForFinishedRidesAsync()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);

            List<RideDto> rides = await _rideLogic.GetFinishedPassengerRidesAsync(userDto.Email);
           return SendResponse(rides);
        }

        [HttpGet]
        public async Task<IActionResult> GetRidesByLoggedUser()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            List<RideDto> rides = (List<RideDto>)_rideLogic.GetRidesByDriver(userDto.Email);

            foreach(var ride in rides)
            {
                foreach(var req in ride.Requests)
                {
                    AddressDto adr = _addressLogic.GetAddressById(req.AddressId);
                    req.Longtitude = adr.Longtitude;
                    req.Latitude = adr.Latitude;
                }
            }

            return SendResponse(rides);
        }

        [HttpGet("ridedate={rideDate}")]
        public  IActionResult GetRidesByDate(DateTime rideDate)
        {
            IEnumerable<RideDto> rides =  _rideLogic.GetRidesByDate(rideDate);
            return SendResponse(rides);
        }

        [HttpGet("addressFromId={addressFromId}")]
        public  IActionResult GetRidesByStartPoint(int addressFromId)
        {
            IEnumerable<RideDto> rides =  _rideLogic.GetRidesByStartPoint(addressFromId);
            return SendResponse(rides);
        }

        [HttpGet("addressToId={addressToId}")]
        public  IActionResult GetRidesByDestination(int addressToId)
        {
            IEnumerable<RideDto> rides =  _rideLogic.GetRidesByDestination(addressToId);
            return SendResponse(rides);
        }

        [HttpGet("ridesByRoute={routeGeometry}")]
        public async Task<IActionResult> GetRidesRouteAsync(string routeGeometry)
        {
            IEnumerable<RideDto> rides = await _rideLogic.GetRidesByRouteAsync(routeGeometry);
            return SendResponse(rides);
        }

        [HttpPost("routes")]
        public async Task<IActionResult> GetRoutesAsync([FromBody]RouteDto routeDto)
        {

            if (routeDto.AddressFrom == null && routeDto.AddressTo == null)
                return BadRequest();

            var userDto = await _userRepository.GetLoggedInUser(User);
            IEnumerable<RouteDto> routes = await _rideLogic.GetRoutesAsync(routeDto, userDto.Email);
            
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


            IEnumerable<PassengerDto> passengers =  _rideLogic.GetPassengersByRideId(rideId);
            if (passengers.ToList().Any())
            {
                return Ok(passengers);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("disactivate")]
        public async Task<IActionResult> SetRideAsInactive([FromBody] RideDto rideDto)
        {
            if (rideDto == null)
            {
                return BadRequest("invalid parameter");

            }
            var userDto = await _userRepository.GetLoggedInUser(User);

            _rideRequestLogic.DeletedRide(rideDto.RideId);
            _rideLogic.SetRideAsInactive(rideDto);
                        
                return Ok();

        }

        [HttpPost]
        public async Task<IActionResult> AddRides([FromBody] IEnumerable<RideDto> rides)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            if (rides == null)
            {
                return BadRequest("Invalid parameter");
            }
            int count = 0;
            foreach (var ride in rides)
            {
                _rideLogic.AddRide(ride, userDto.Email);
                
                
                    count++;

            }

            return Ok();

        }



        private IActionResult SendResponse(IEnumerable<RideDto> ride)
        {
            return Ok(ride);
            /* method should execute code below, but since frontend doesn't handle Not found response, controller just returns Ok all the time
            if (ride.Any())
            {
                return Ok(ride);

            }
            return NotFoud();
            */
        }
    }


}