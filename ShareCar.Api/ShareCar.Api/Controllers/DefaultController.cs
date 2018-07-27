using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;
using ShareCar.Logic.RequestLogic;
using ShareCar.Logic.Default_Logic;
namespace ShareCar.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Default")]
    public class DefaultController : Controller
    {
        private readonly IDefaultLogic _requestLogic;
       // private readonly IUserRepository _userRepository;

        public DefaultController(IDefaultLogic requestLogic, IUserRepository userRepository)
        {
            _requestLogic = requestLogic;
      //      _userRepository = userRepository;
        }
        
        [HttpGet]
        public  IActionResult GetUserRequestsAsync(bool driver)
        {
            //var userDto = await _userRepository.GetLoggedInUser(User);
            IEnumerable<RequestDto> request;

                request = _requestLogic.FindUsersRequests(driver, /*userDto.Email*/ "fff");

            return Ok();
        }

        [HttpPost]
        public IActionResult Post([FromBody] RequestDto request)
        {
            if (request == null)
            {
                return BadRequest("Invalid parameter");
            }

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
        [HttpPut]
        public IActionResult Put([FromBody] RequestDto request)
        {
            if (request == null)
            {
                return BadRequest("Invalid parameter");
            }

            //     bool result = _requestLogic.AddRequest(request);

            if (true)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Operation failed");
            }

        }
    }
}