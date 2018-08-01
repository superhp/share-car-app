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
        private readonly IPersonLogic _personLogic;

        public UserController(Db.Repositories.IUserRepository userRepository, IPersonLogic logic)
        {
            _userRepository = userRepository;
            _personLogic = logic;
        }


        public async Task<IActionResult> Get()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            PersonDto person = new PersonDto
            {
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                ProfilePicture = userDto.PictureUrl
                
            };

            var personData = _personLogic.GetPersonByEmail(userDto.Email);

            return Ok(personData);
        }

        [HttpPost]
        public IActionResult Post([FromBody] PersonDto person)
        {
            if (person == null)
            {
                return BadRequest("Invalid parameters");
            }

            _personLogic.UpdatePerson(person);

            var updatedPerson = _personLogic.GetPersonByEmail(person.Email);
            if (updatedPerson != null)
            {
                return Ok();
            } else
            {
                return BadRequest("Invalid User");
            }
        }




    }
}