using Microsoft.AspNetCore.Identity;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Identity
{
    public interface IUserManagment
    {
         void CheckIfRegistered(UserDto user);
         int CalculatePoints(IdentityUser<string> user);
    }
}
