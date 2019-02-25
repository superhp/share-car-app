using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories;
using ShareCar.Db.Repositories.User_Repository;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Cognizant;
using ShareCar.Logic.ObjectMapping;
using ShareCar.Logic.Passenger_Logic;

namespace ShareCar.Logic.User_Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly IUserRepository _userRepository;
        private readonly IPassengerLogic _passengerLogic;
        private readonly IMapper _mapper;

        public UserLogic(IUserRepository userRepository, IPassengerLogic passengerLogic, IMapper mapper)
        {
            _userRepository = userRepository;
            _passengerLogic = passengerLogic;
            _mapper = mapper;

        }

        public async Task<UserDto> GetUserAsync(ClaimsPrincipal principal)
        {
            var user = await _userRepository.GetLoggedInUser(principal);
            return user;
            
        }

        public IEnumerable<UserDto> GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            return _mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users);
        }

        public async Task UpdateUserAsync(UserDto updatedUser, ClaimsPrincipal User)
        {
            var _userToUpdate = await _userRepository.GetLoggedInUser(User);
             
            if (_userToUpdate != null)
            {
                _userToUpdate.FirstName = updatedUser.FirstName;
                _userToUpdate.LastName = updatedUser.LastName;
                _userToUpdate.Phone = updatedUser.Phone;
                _userToUpdate.LicensePlate = updatedUser.LicensePlate;

                var _user = _mapper.Map<UserDto, User>(_userToUpdate);
                await _userRepository.UpdateUserAsync(_user, User);
            }

        }

        public int CountPoints(string email)
        {
            int points = _passengerLogic.GetUsersPoints(email);
            return points;
        }

        public Dictionary<UserDto, int> GetWinnerBoard()
        {
            Dictionary<UserDto, int> userWithPoints = new Dictionary<UserDto, int>();
            var users = _userRepository.GetAllUsers();
            int i = 0;
            foreach(var user in users)
            {
                int userPoints = CountPoints(user.Email);
                if(i<5)
                {
                    userWithPoints.Add(_mapper.Map<User, UserDto>(user), userPoints);
                }
                else
                {
                    var lowestPoints = userWithPoints.Values.Min();
                    int count = userWithPoints.Where(x => x.Value == lowestPoints).Count();
                    if (lowestPoints < userPoints)
                    {
                        userWithPoints.Add(_mapper.Map<User, UserDto>(user), userPoints);
                        userWithPoints.Remove(userWithPoints.FirstOrDefault(x => x.Value == lowestPoints).Key);
                    }
                    else if (userWithPoints.Values.Min() == userPoints)
                    {
                        userWithPoints.Add(_mapper.Map<User, UserDto>(user), userPoints);
                    }
                }
                i++;
            }
            userWithPoints = userWithPoints.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, x => x.Value);
            return userWithPoints;
        }

        public UnauthorizedUserDto GetUnauthorizedUser(string email)
        {
           var user = _userRepository.GetUnauthorizedUser(email);
            return _mapper.Map<UnauthorizedUser, UnauthorizedUserDto>(user);
        }

        public Task CreateUser(UserDto userDto)
        {
            return _userRepository.CreateUser(_mapper.Map<UserDto, User>(userDto));
        }

        public void CreateUnauthorizedUser(UnauthorizedUserDto userDto)
        {
            _userRepository.CreateUnauthorizedUser(_mapper.Map<UnauthorizedUserDto, UnauthorizedUser>(userDto));
        }

        public bool SetUsersCognizantEmail(string cognizantEmail, string loginEmail)
        {
            return _userRepository.SetUsersCognizantEmail(cognizantEmail, loginEmail);
        }
    }
}
