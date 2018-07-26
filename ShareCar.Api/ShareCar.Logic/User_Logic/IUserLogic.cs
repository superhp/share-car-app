using Microsoft.AspNetCore.Identity;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.User_Logic
{
    public interface IUserLogic
    {
         bool CheckIfRegistered(IdentityUser<string> user);
         void RegisterUser(IdentityUser<string> user);
         IEnumerable<PassengerDto> FindPassengersByEmail(string email);
         int CalculatePoints(IdentityUser<string> user);
    }
}
