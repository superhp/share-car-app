using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.User_Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly IUserRepository _userRepository;
        private readonly IPassengerRepository _passengerRepository;

        public UserLogic(IUserRepository userRepository, IPassengerRepository passengerRepository)
        {
            _userRepository = userRepository;
            _passengerRepository = passengerRepository;
        }

        public async Task<UserDto> GetUserAsync(ClaimsPrincipal principal)
        {
            var user = await _userRepository.GetLoggedInUser(principal);
            return user;
        }

        public async void UpdateUserAsync(UserDto updatedUser, ClaimsPrincipal User)
        {
            var userToUpdate = await _userRepository.GetLoggedInUser(User);
             
            if (userToUpdate != null)
            {
                var _user = new User
                {
                    FirstName = updatedUser.FirstName,
                    UserName = updatedUser.LastName,
                    Email = updatedUser.Email,
                    Phone = updatedUser.Phone,
                    PictureUrl = updatedUser.PictureUrl,
                    LicensePlate = updatedUser.LicensePlate,
                    
                };

                await Task.Run(() => _userRepository.UpdateUserAsync(_user));
            }

        }

        public int CountPoints(string email)
        {
            int points = _passengerRepository.GetUsersPoints(email);
            return points;
        }
    }
}
