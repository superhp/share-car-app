﻿using System.Security.Claims;
using System.Threading.Tasks;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Facebook;

namespace ShareCar.Db.Repositories
{
    public interface IUserRepository
    {
        Task CreateFacebookUser(FacebookUserDataDto userDto);
        Task<UserDto> GetLoggedInUser(ClaimsPrincipal principal);
        Task UpdateUserAsync(User user);
    }
}