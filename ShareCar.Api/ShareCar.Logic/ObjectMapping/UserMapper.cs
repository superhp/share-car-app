using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;

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
