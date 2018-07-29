using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Logic.ObjectMapping;

namespace ShareCar.Logic.User_Logic
{
    public class UserLogic : IUserLogic
    {
        private readonly PassengerMapper _passengerMapper = new PassengerMapper();
        private readonly UserMapper _userMapper = new UserMapper();
        private readonly IUserRepository _userQueries;

        public UserLogic(IUserRepository userQueries)
        {
            _userQueries = userQueries;
        }

        public bool CheckIfRegistered(IdentityUser<string> user)
        {
            return _userQueries.CheckIfRegistered(user.Email);
        }

        public void RegisterUser(IdentityUser<string> user)
        {
            _userQueries.RegisterUser(_userMapper.MapIdentityUserToPerson(user));
        }

        public int CalculatePoints(IdentityUser<string> user)
        {
            return _userQueries.CalculatePoints(_userMapper.MapIdentityUserToPerson(user).Email);
        }
        
        
        }
    
}
