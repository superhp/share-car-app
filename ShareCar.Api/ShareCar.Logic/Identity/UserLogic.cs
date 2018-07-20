using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using ShareCar.Logic.Identity;

namespace ShareCar.Logic.Identity
{
    public class UserLogic : IUserLogic
    {
        public UserLogic()
        {

        }

        public bool CheckIfRegistered(IdentityUser<string> user)
        {
            throw new NotImplementedException();
        }

        public void RegisterUser(IdentityUser<string> user)
        {
            throw new NotImplementedException();
        }

        public int CalculatePoints(IdentityUser<string> user)
        {
            throw new NotImplementedException();
        }

    }
}
