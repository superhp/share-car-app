using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto;
using ShareCar.Logic.Person_Logic;

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
            var userDto = await _userLogic.GetUserAsync(User);
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserDto user)
        {
            if (user == null)
            {
                return BadRequest("Invalid parameters");
            }

            await  Task.Run(()=>_userLogic.UpdateUserAsync(user, User));
            return Ok();
        }




    }
}