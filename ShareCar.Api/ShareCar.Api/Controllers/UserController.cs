using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Identity;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly Db.Repositories.IUserRepository _userRepository;
        private readonly IUserLogic _userLogic;

        public UserController(Db.Repositories.IUserRepository userRepository, IUserLogic userLogic)
        {
            _userRepository = userRepository;
            _userLogic = userLogic;
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
            IEnumerable<PassengerDto> passengerRides = _userLogic.FindPassengersByEmail(email);
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