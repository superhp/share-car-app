using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Facebook;

namespace ShareCar.Db.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _databaseContext;

        public UserRepository(UserManager<User> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _databaseContext = context;
        }

        public async Task CreateFacebookUser(FacebookUserDataDto userDto)
        {
            var appUser = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                FacebookId = userDto.Id,
                Email = userDto.Email,
                UserName = userDto.Email,
                PictureUrl = userDto.Picture.Data.Url
            };


            var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

            if (!result.Succeeded)
                throw new ArgumentException("Failed to create local user account.");
         
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _databaseContext.Users;
        }
        public async Task<UserDto> GetLoggedInUser(ClaimsPrincipal principal)
        {
            var user = await _userManager.GetUserAsync(principal);
            
            var userDto = new UserDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PictureUrl = user.PictureUrl,
                Phone = user.Phone,
                LicensePlate = user.LicensePlate,
            };

            return userDto;
        }

        public async Task<IdentityResult> UpdateUserAsync(User user, ClaimsPrincipal principal)
        {
            var _user = await _userManager.GetUserAsync(principal);
            _user.FirstName = user.FirstName;
            _user.LastName = user.LastName;
            _user.Phone = user.Phone;
            _user.LicensePlate = user.LicensePlate;
            var userAsync = await _userManager.UpdateAsync(_user);
            return userAsync;
        }
    }
}