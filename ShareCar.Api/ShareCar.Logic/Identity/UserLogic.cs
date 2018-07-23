using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db;
using ShareCar.Logic.DatabaseQueries;
using ShareCar.Logic.Identity;
using ShareCar.Logic.ObjectMapping;

namespace ShareCar.Logic.Identity
{
    public class UserLogic : IUserLogic
    {
        private readonly ApplicationDbContext _databaseContext;
        private readonly IUserQueries _userQueries;
        private readonly UserMapper _userMapper = new UserMapper();

        public UserLogic(ApplicationDbContext context)
        {
            _databaseContext = context;
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
