using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Dto;
using ShareCar.Logic.RideRequest_Logic;
using Microsoft.AspNetCore.Authorization;
using ShareCar.Logic.Ride_Logic;

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/RideRequest")]
    public class RideRequestController : Controller
    {
        private readonly IRideRequestLogic _requestLogic;
        private readonly IUserRepository _userRepository;
        private readonly IRideLogic _rideLogic;

        public RideRequestController(IRideRequestLogic requestLogic, IUserRepository userRepository, IRideLogic rideLogic)
        {
            _requestLogic = requestLogic;
            _userRepository = userRepository;
            _rideLogic = rideLogic;
        }

        [HttpGet("{driver}")]
        public async Task<IActionResult> GetUserRequestsAsync(string driver)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);

            bool isDriver = Boolean.Parse(driver);

            

            IEnumerable<RideRequestDto> request = await _requestLogic.GetUsersRequests(isDriver, userDto.Email);

            return Ok(request);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RideRequestDto request)
        {
            if (request == null)
            {
                return BadRequest("Invalid parameter");
            }
            var userDto = await _userRepository.GetLoggedInUser(User);
            request.PassengerEmail = userDto.Email;
            string email = _rideLogic.GetRideById(request.RideId).DriverEmail;
            bool result = _requestLogic.AddRequest(request, email);
            
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Operation failed");
            }
        }

        [HttpPost("seenPassenger")]
        public IActionResult SeenRequestsPassenger([FromBody] int[] requests)
        {
            _requestLogic.SeenByPassenger(requests);

            return Ok();
        }

        [HttpPost("seenDriver")]
        public IActionResult SeenDriverPassenger([FromBody] int[] requests)
        {
            _requestLogic.SeenByDriver(requests);

            return Ok();
        }

        [HttpPut]
        public IActionResult Put([FromBody] RideRequestDto request)
        {
            if (request == null)
            {
                return BadRequest("Invalid parameter");
            }

            bool result = _requestLogic.UpdateRequest(request);
            if (result)
            {
                return Ok();
            }
            return BadRequest("Invalid parameter");


        }
    }
}