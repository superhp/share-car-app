using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.User_Logic
{
    public interface IUserRepository
    {
        bool CheckIfRegistered(string userEmail);
        void RegisterUser(User user);
        int CalculatePoints(string userEmail);
       
    }
}
