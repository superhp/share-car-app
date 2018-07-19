using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Identity
{
    public class UserManagment : IUserManagment
    {

        private TasksDb _dbContext;

        public UserManagment()
        {

        }

        public int CalculatePoints(IdentityUser<string> user)
        {
            throw new NotImplementedException();
        }

        public void CheckIfRegistered(IdentityUser<string> user)
        {

          //  UserAutentification item = _dbContext.Users.Where(t => t.Email == user.Email);
           
            // TRY TO FIND USER

         //   if (item == null)
        //    {
         //       _dbContext.Users.Add(new User { })//      --------REGISTER IF NOT FOUND
        //    }
        }

        public void CheckIfRegistered(UserDto user)
        {
            throw new NotImplementedException();
        }

        private UserAutentification MapFromDto(UserDto user)
        {
            return new UserAutentification
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                FacebookId = user.Fa
                PictureUrl { get; set;
        }

    }
}

    }
}
