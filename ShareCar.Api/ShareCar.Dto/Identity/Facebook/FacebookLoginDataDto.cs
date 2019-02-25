using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto.Identity.Facebook
{
    public class FacebookLoginDataDto
    {
        public AccessTokenDto AccessToken { get; set; }
        public int? VerificationCode { get; set; }
    }
}
