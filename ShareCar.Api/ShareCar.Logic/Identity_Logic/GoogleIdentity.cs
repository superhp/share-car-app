using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories.User_Repository;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Facebook;
using ShareCar.Dto.Identity.Google;
using ShareCar.Logic.User_Logic;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Logic.Identity_Logic
{
    public class GoogleIdentity : IGoogleIdentity
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly IUserLogic _userLogic;
        private readonly ICognizantIdentity _cognizantIdentity;
        private static readonly HttpClient Client = new HttpClient();

       public GoogleIdentity(UserManager<User> userManager, IJwtFactory jwtFactory, IUserLogic userLogic, ICognizantIdentity cognizantIdentity)
        {

            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _userLogic = userLogic;
            _cognizantIdentity = cognizantIdentity;
        }
        
        public async Task<string> Login(GoogleUserDataDto userInfo)
        {
            // ready to create the local user account (if necessary) and jwt
            var user =  _userLogic.GetUserByEmail(Dto.EmailType.GOOGLE, userInfo.Email);
            if (user == null)
            {
                await _userLogic.CreateUser(new UserDto
                {
                    FirstName = userInfo.GivenName,
                    LastName = userInfo.FamilyName,
                    Email = userInfo.Email,
                    PictureUrl = userInfo.ImageUrl,
                    FacebookVerified = false,
                    GoogleVerified = false,
                    GoogleEmail = userInfo.Email,
                    FacebookEmail = ""
                });
                _userLogic.CreateUnauthorizedUser(new UnauthorizedUserDto { Email = userInfo.Email });

                return null;
            }

            if (!user.GoogleVerified)
            {
                return null;
            }

            // generate the jwt for the local user
            var localUser = await _userManager.FindByNameAsync(user.Email);

            if (localUser == null)
            {
                throw new ArgumentException("Local user account could not be found.");
            }

            return await GenerateJwt(localUser);
        }

        private async Task<string> GenerateJwt(User localUser)
        {
            var jwtIdentity = _jwtFactory.GenerateClaimsIdentity(localUser.UserName, localUser.Id);
            var jwt = await _jwtFactory.GenerateEncodedToken(localUser.UserName, jwtIdentity);

            return jwt;
        }
    }
}
