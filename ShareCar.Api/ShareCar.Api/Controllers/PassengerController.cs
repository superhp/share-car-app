using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Repositories.User_Repository;
using ShareCar.Dto;
using ShareCar.Logic.Passenger_Logic;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Api.Controllers
{
   [Authorize]
    [Produces("application/json")]
    [Route("api/Passenger")]
    public class PassengerController : Controller
    {
        private readonly IPassengerLogic _passengerLogic;
        private readonly IUserLogic _userLogic;
        private readonly IUserRepository _userRepository;


        public PassengerController(IPassengerLogic passengerLogic, IUserLogic userLogic, IUserRepository userRepository)
        {
            _passengerLogic = passengerLogic;
            _userLogic = userLogic;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetPassengersByDriverAsync()
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            var passengers = _passengerLogic.GetPassengersByDriver(userDto.Email);
            var users = _userLogic.GetAllUsers();

            foreach (var passenger in passengers)
            {
                var user = users.Single(x => x.Email == passenger.Email);
                passenger.FirstName = user.FirstName;
                passenger.LastName = user.LastName;
                passenger.Phone = user.Phone;
            }
            return Ok(passengers);
        }

    }
}