using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;


namespace ShareCar.Logic.ObjectMapping
{
    class UserMapper
    {
        public User MapIdentityUserToPerson(IdentityUser<string> user)
        {
            return new User
            {
                Email = user.Email
            };
        }
    }
}
