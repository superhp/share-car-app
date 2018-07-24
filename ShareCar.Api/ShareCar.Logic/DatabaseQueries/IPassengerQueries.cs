using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.DatabaseQueries
{
    interface IPassengerQueries
    {
        IEnumerable<Passenger> FindPassengersByEmail(string email);
        IEnumerable<Passenger> FindPassengersByRideId(int rideId);
    }
}
