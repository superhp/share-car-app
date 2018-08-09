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

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/RideRequest")]
    public class RideRequestController : Controller
    {
        private readonly IRideRequestLogic _requestLogic;
        private readonly IUserRepository _userRepository;

        public RideRequestController(IRideRequestLogic requestLogic, IUserRepository userRepository)
        {
            _requestLogic = requestLogic;
            _userRepository = userRepository;
        }

        [HttpGet("{driver}")]
        public async Task<IActionResult> GetUserRequestsAsync(string driver)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);

            bool isDriver = Boolean.Parse(driver);

            

            IEnumerable<RideRequestDto> request = await _requestLogic.FindUsersRequests(isDriver, userDto.Email);

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
            bool result = _requestLogic.AddRequest(request);
            
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