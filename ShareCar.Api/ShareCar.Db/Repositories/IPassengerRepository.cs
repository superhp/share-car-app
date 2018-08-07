using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories
{
    public interface IPassengerRepository
    {
        int GetUsersPoints(string email);
        bool AddNewPassenger(Passenger passenger);

    }
}
