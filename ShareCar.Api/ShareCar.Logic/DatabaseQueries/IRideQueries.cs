using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.DatabaseQueries
{
    interface IRideQueries
    {
        Ride FindRideById(int id);
        IEnumerable<Ride> FindRidesByDriver(string email);
        IEnumerable<Ride> FindRidesByDate(DateTime date);
        IEnumerable<Ride> FindRidesByDestination(Address address);
        IEnumerable<Ride> FindRidesByStartPoint(Address address);
        void UpdateRide(Ride ride);
        void AddRide(Ride ride);
    }
}
