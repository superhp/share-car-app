using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;

namespace ShareCar.Logic.DatabaseQueries
{
   public interface IRideQueries
    {
        Ride FindRideById(int id);
        IEnumerable<Ride> FindRidesByDriver(string email);
        IEnumerable<Ride> FindRidesByDate(DateTime date);
        IEnumerable<Ride> FindRidesByDestination(Address address);
        IEnumerable<Ride> FindRidesByStartPoint(Address address);
        IEnumerable<Passenger> FindPassengersByRideId(int rideId);
        bool UpdateRide(Ride ride);
        void AddRide(Ride ride);
    }
}
