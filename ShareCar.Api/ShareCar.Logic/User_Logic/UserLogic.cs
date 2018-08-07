using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;
using ShareCar.Logic.ObjectMapping;

namespace ShareCar.Logic.User_Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly IUserRepository _userRepository;
        private readonly IPassengerRepository _passengerRepository;
        private readonly IMapper _mapper;

        public UserLogic(IUserRepository userRepository, IPassengerRepository passengerRepository IMapper mapper)
        {
            _userRepository = userRepository;
            _passengerRepository = passengerRepository;
            _mapper = mapper;

        }

        public async Task<UserDto> GetUserAsync(ClaimsPrincipal principal)
        {
            var user = await _userRepository.GetLoggedInUser(principal);
            return user;
        }

        public async void UpdateUserAsync(UserDto updatedUser, ClaimsPrincipal User)
        {
            var _userToUpdate = await _userRepository.GetLoggedInUser(User);
             
            if (_userToUpdate != null)
            {
                _userToUpdate.FirstName = updatedUser.FirstName;
                _userToUpdate.LastName = updatedUser.LastName;
                _userToUpdate.Phone = updatedUser.Phone;
                _userToUpdate.LicensePlate = updatedUser.LicensePlate;

                var _user = _mapper.Map<UserDto, User>(_userToUpdate);
                await Task.Run(() => _userRepository.UpdateUserAsync(_user, User));
            }

        }

        public int CountPoints(string email)
        {
            int points = _passengerRepository.GetUsersPoints(email);
            return points;
        }
    }
}
