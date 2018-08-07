using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto;
using ShareCar.Dto.Identity;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }


        public async Task<IActionResult> Get()
        {
            var userDto = await _userLogic.GetUserAsync(User);
            int points = _userLogic.CountPoints(userDto.Email);
            return Ok(new
            {
                user = userDto,
                pointCount = points
            });
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