using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto.Identity
{
    public class LoginResponseModel
    {
        public string JwtToken { get; set; } // returned for registered users.
        public bool WaitingForCode { get; set; } // Returned for people who aren't verified as cognizant employees. True => 
        // cogniznat email is already known, verification code is required. False => cognizant email is required.
    }
}
