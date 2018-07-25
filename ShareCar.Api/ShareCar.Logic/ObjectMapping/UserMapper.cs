using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;


namespace ShareCar.Logic.ObjectMapping
{
    class UserMapper
    {
        public Person MapIdentityUserToPerson(IdentityUser<string> user)
        {
            return new Person
            {
                Email = user.Email
            };
        }
    }
}
