using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Logic.Person_Logic;
namespace ShareCar.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Person")]
    public class PersonController : Controller
    {

        private readonly IPersonRepository _personRepository;

        public PersonController( IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpGet("{email}")]
        public IActionResult GetUserName(string email)
        {

            var personDto = _personRepository.GetPersonByEmail(email);
            if (personDto == null)
            {
                return NotFound();
            }
            return Ok(personDto);
        }
    }
}