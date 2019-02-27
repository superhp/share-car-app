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
        public async Task<IActionResult> VerificationCode([FromBody] VerificationCodeSubmitData data)
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
        public IActionResult Cognizant([FromBody] CognizantData data)
        {
            
               var result = _userLogic.SetUsersCognizantEmail(data.CognizantEmail, data.LoginEmail);
            _cognizantIdentity.SendVerificationCode(data.CognizantEmail, data.LoginEmail);
            if (result)
            {
                return Ok();
            }
                return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody] AccessTokenDto accessToken)
        {
            try
            {
                var response = await _facebookIdentity.Login(accessToken);
                if(response.JwtToken != null)
                {
                    AddJwtToCookie(response.JwtToken);
                    return Ok();
                }
                else
                {
                    //return Ok();
                   return Unauthorized();
                }


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Google([FromBody] GoogleUserDataDto userData)
        {
            try
            {
                var response = await _googleIdentity.Login(userData);
                if (response.JwtToken != null)
                {
                    AddJwtToCookie(response.JwtToken);
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
    }
}