using ShareCar.Db;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.DatabaseQueries
{
    class UserQueries : IUserQueries
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
