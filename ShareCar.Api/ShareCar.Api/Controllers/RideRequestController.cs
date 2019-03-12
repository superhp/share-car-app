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
using ShareCar.Db.Repositories.User_Repository;

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
            if (driver == null)
            {
                return BadRequest();
            }
            var userDto = await _userRepository.GetLoggedInUser(User);

            bool isDriver = false;

            try
            {
                isDriver = Boolean.Parse(driver);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            IEnumerable<RideRequestDto> request = _requestLogic.GetUsersRequests(isDriver, userDto.Email);

            return Ok(request);
        }

        [HttpPost]
        public async Task<IActionResult> AddRequest([FromBody] RideRequestDto request)
        {
            if (request == null)
            {
                return BadRequest();
            }
            var userDto = await _userRepository.GetLoggedInUser(User);
            request.PassengerEmail = userDto.Email;
            string email = _rideLogic.GetRideById(request.RideId).DriverEmail;

            _requestLogic.AddRequest(request, email);

            return Ok();

        }

        [HttpPost("seenPassenger")]
        public void SeenRequestsPassenger([FromBody] int[] requests)
        {
            _requestLogic.SeenByPassenger(requests);
        }

        [HttpPost("seenDriver")]
        public void SeenDriverPassenger([FromBody] int[] requests)
        {
            _requestLogic.SeenByDriver(requests);
        }

        [HttpPut]
        public IActionResult UpdateRequests([FromBody] RideRequestDto request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            _requestLogic.UpdateRequest(request);

            return Ok();

        }
    }
}