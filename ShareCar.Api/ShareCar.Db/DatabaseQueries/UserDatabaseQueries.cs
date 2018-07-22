using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using ShareCar.Db.Entities;

namespace ShareCar.Db.DatabaseQueries
{
    public class UserDatabaseQueries : IUserDatabase
    {
        private readonly ApplicationDbContext _databaseContext;

        public int CalculatePoints(string userEmail)
        {
            throw new NotImplementedException();
        }

        public bool CheckIfRegistered(string userEmail)
        {
            throw new NotImplementedException();
        }

        public void RegisterUser(Person user)
        {
            throw new NotImplementedException();
        }
    }
}
