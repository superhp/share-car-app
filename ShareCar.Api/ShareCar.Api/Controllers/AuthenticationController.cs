using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Google;
using ShareCar.Logic.User_Logic;

namespace ShareCar.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthenticationController : Controller
    {
        private readonly IFacebookIdentity _facebookIdentity;
        private readonly IGoogleIdentity _googleIdentity;

        public AuthenticationController(IFacebookIdentity facebookIdentity, IGoogleIdentity googleIdentity)
        {
            _facebookIdentity = facebookIdentity;
            _googleIdentity = googleIdentity;
        }

        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody] AccessTokenDto facebookAccessToken)
        {
            try
            {
                var jwt = await _facebookIdentity.Login(facebookAccessToken);
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