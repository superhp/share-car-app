using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;

namespace ShareCar.Db.Database_queries
{
    class UserDatabaseQueries : IUserDatabase
    {
        public int CalculatePoints(string userEmail)
        {
            throw new NotImplementedException();
        }

        public bool CheckIfRegistered(string userEmail)
        {
            throw new NotImplementedException();
        }

        public void RegisterUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
