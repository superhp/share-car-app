using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace ShareCar.Db.Entities
{
    public class UserAutentification : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }
        public List<Ride> Ride { get; set; }

    }
}