using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Cognizant;
using ShareCar.Dto.Identity.Google;
using ShareCar.Logic.Identity_Logic;
using ShareCar.Logic.User_Logic;
using System;
using System.Threading.Tasks;

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
        public async Task<IActionResult> VerificationCodeSubmit([FromBody] VerificationCodeSubmitData data)
        {
            try
            {

                var jwt = await _cognizantIdentity.SubmitVerificationCodeAsync(data);

                if (jwt != null)
                {
                    AddJwtToCookie(jwt);
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
        public IActionResult CognizantEmailSubmit([FromBody] CognizantData data)
        {
            if (data.CognizantEmail == null ||
                data.CognizantEmail.Length <= 14 ||
                data.CognizantEmail.Substring(data.CognizantEmail.Length - 14) != "@cognizant.com")
            {
                return Unauthorized();
            }

            bool isFacebookEmail = data.FacebookEmail != null;
            EmailType type = isFacebookEmail ? EmailType.FACEBOOK : EmailType.GOOGLE;

            if(_userLogic.DoesUserExist(type, data.CognizantEmail))
            {
                return BadRequest("There is already registered user with such cognizant email");
            }

            var result = _userLogic.SetUsersCognizantEmail(data);
            var loginEmail = data.FacebookEmail == null ? data.GoogleEmail : data.FacebookEmail;
            _cognizantIdentity.SendVerificationCode(data.CognizantEmail, loginEmail);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> FacebookLogin([FromBody] AccessTokenDto accessToken)
        {
            try
            {
                var jwt = await _facebookIdentity.Login(accessToken);
                if (jwt != null)
                {
                    AddJwtToCookie(jwt);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleUserDataDto userData)
        {
            try
            {
                var jwt = await _googleIdentity.Login(userData);
                if (jwt != null)
                {
                    AddJwtToCookie(jwt);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

        [HttpGet]
        public IActionResult Temp()
        {
            return Ok();
        }

    }
}