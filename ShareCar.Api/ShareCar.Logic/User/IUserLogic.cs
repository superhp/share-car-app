using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Logic.Person_Logic
{
    public interface IUserLogic
    {
        Task<UserDto> GetUserAsync(ClaimsPrincipal principal);
        void UpdateUserAsync(UserDto updatedUser, ClaimsPrincipal User);
    }
}
