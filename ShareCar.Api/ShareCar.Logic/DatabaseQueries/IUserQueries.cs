using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.DatabaseQueries
{
    interface IUserQueries
    {
        bool CheckIfRegistered(string userEmail);
        void RegisterUser(Person user);
        int CalculatePoints(string userEmail);
    }
}
