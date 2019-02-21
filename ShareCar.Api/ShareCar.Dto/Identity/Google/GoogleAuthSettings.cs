using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto.Identity.Google
{
    public class GoogleAuthSettings
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string ClientAccessTokenUrl { get; set; }
        public string UserInfoUrl { get; set; }
        public string DebugTokenUrl { get; set; }
    }
}
