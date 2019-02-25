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
        
        public async Task<LoginResponseModel> Login(GoogleUserDataDto userInfo)
        {
            // ready to create the local user account (if necessary) and jwt
            var user = await _userManager.FindByEmailAsync(userInfo.Email);
            var response = new LoginResponseModel();
            if (user == null)
            {
                _userLogic.CreateUnauthorizedUser(new UnauthorizedUserDto { Email = userInfo.Email });
                await _userLogic.CreateUser(new UserDto
                {
                    FirstName = userInfo.GivenName,
                    LastName = userInfo.FamilyName,
                    Email = userInfo.Email,
                    PictureUrl = userInfo.ImageUrl,
                    FacebookVerified = false,
                    GoogleVerified = false,
                    FacebookEmail = userInfo.Email,
                    GoogleEmail = ""
                });
                response.WaitingForCode = false;
                return response;
            }

            if (!user.GoogleVerified)
            {
                var unauthorizedUser = _userLogic.GetUnauthorizedUser(userInfo.Email);
                await _cognizantIdentity.SendVerificationCode(user.CognizantEmail, unauthorizedUser.VerificationCode);
                response.WaitingForCode = true;
                return response;
            }

            // generate the jwt for the local user
            var localUser = await _userManager.FindByNameAsync(userInfo.Email);

            if (localUser == null)
            {
                throw new ArgumentException("Local user account could not be found.");
            }

            var jwt = await GenerateJwt(localUser);
            response.JwtToken = jwt;
            return response;
        }

        private async Task<string> GenerateJwt(User localUser)
        {
            var jwtIdentity = _jwtFactory.GenerateClaimsIdentity(localUser.UserName, localUser.Id);
            var jwt = await _jwtFactory.GenerateEncodedToken(localUser.UserName, jwtIdentity);

            return jwt;
        }
    }
}
