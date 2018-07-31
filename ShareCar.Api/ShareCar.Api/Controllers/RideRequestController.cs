using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;
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

            bool isDriver = false;

            if (driver == "true")
                isDriver = true;

            IEnumerable<RequestDto> request;

            request = _requestLogic.FindUsersRequests(isDriver, userDto.Email);

            return Ok(request);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RequestDto request)
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
        [HttpPut("{response}")]
        public IActionResult Put([FromBody] RequestDto request)
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