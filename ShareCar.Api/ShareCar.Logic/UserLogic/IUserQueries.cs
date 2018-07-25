using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.DatabaseQueries
{
    public interface IUserQueries
    {
        bool CheckIfRegistered(string userEmail);
        void RegisterUser(User user);
        int CalculatePoints(string userEmail);
        IEnumerable<Passenger> FindPassengersByEmail(string email);
    }
}
