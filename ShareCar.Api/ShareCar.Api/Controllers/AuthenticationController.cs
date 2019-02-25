using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Cognizant;
using ShareCar.Dto.Identity.Facebook;
using ShareCar.Dto.Identity.Google;
using ShareCar.Logic.Identity_Logic;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthenticationController : Controller
    {
        private readonly IFacebookIdentity _facebookIdentity;
        private readonly IGoogleIdentity _googleIdentity;
        private readonly ICognizantIdentity _cognizantIdentity;
        private readonly IUserLogic _userLogic;

        public AuthenticationController(IFacebookIdentity facebookIdentity, IGoogleIdentity googleIdentity, ICognizantIdentity cognizantIdentity, IUserLogic userLogic)
        {
            _facebookIdentity = facebookIdentity;
            _googleIdentity = googleIdentity;
            _userLogic = userLogic;
            _cognizantIdentity = cognizantIdentity;
        }

        [HttpPost]
        public IActionResult VerificationCode([FromBody] VerificationCodeSubmitData data)
        {
            try
            {
                if (_cognizantIdentity.SubmitVerificationCode(data))
                {
                    return Ok();
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Cognizant([FromBody] CognizantData cogzniantData)
        {
            try
            {
                _cognizantIdentity.SubmitCognizantEmailAsync(cogzniantData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody] FacebookLoginDataDto facebookLoginData)
        {
            try
            {
                var jwt = await _facebookIdentity.Login(facebookLoginData);



                AddJwtToCookie(jwt);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Google([FromBody] GoogleUserDataDto userData)
        {
            try
            {
                var jwt = await _googleIdentity.Login(userData);
                if (jwt == "")
                {
                    return Unauthorized();
                }
                AddJwtToCookie(jwt);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("token");

            return Ok();
        }

        private void AddJwtToCookie(string jwt)
        {
            var options = new CookieOptions
            {
                HttpOnly = true
            };
            Response.Cookies.Append("token", jwt, options);
        }
    }
}