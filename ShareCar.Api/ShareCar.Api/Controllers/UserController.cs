using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Identity;

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IPassengerLogic passengerLogic;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IActionResult> Get()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);

            return Ok(userDto);
        }

        [HttpGet]
        [Route("{email}")]
        public IActionResult GetPassengersByEmail(string email)
        {
            IEnumerable<PassengerDto> passengerRides = passengerLogic.FindPassengersByEmail(email);
            if (passengerRides != null)
            {
                return Ok(passengerRides);
            }
            else
            {
                return BadRequest();
            }
        }


    }
}