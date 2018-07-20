using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Database_queries
{
    interface IUserDatabase
    {
        bool CheckIfRegistered(string userEmail);
        void RegisterUser(User user);
        int CalculatePoints(string userEmail);
    }
}
