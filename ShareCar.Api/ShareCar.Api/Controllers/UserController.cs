using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Person_Logic;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly Db.Repositories.IUserRepository _userRepository;
        private readonly IPersonLogic _personLogic;

        public UserController(Db.Repositories.IUserRepository userRepository, IUserLogic userLogic, IPersonLogic logic)
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
                LastName = userDto.LastName
            };


            ///-------------------------IMPORTANT
            // This code can't be added in a place where creation of new user takes place, because server won't work(for unkown reason )
            // Uncomment code when login with new account in order to add it to the database and then comment it back,
            // because each time program will try to autentify user  there will be two calls, and on a second one PersonDto check won't be found
            // and program will try to insert it (again), throw an error, which will crash program only on another atepmt to add any data to database
      //      PersonDto check = _personLogic.GetPersonByEmail(userDto.Email);  

        //   if(check == null)
       //     _personLogic.AddPerson(person);

            return Ok(userDto);
        }

        [Route("mock")]
        public async Task<IActionResult> GetMockData()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            userDto.Phone = "861223591";
            userDto.LicensePlate = "AHZ205";
            return Ok(userDto);
        }

        [HttpPatch]
        public IActionResult Post([FromBody] PersonDto person)
        {
            if (person == null)
            {
                return BadRequest("Invalid parameters");
            }

            _personLogic.UpdatePerson(person);

            var updatedPerson = _personLogic.GetPersonByEmail(person.Email);
            return Ok(updatedPerson);
        }




    }
}