using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories
{
    public interface IPassengerRepository

    {
        bool AddNewPassenger(Passenger passenger);
    }
}
