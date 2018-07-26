using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShareCar.Logic.DatabaseQueries
{
   public interface IRideQueries
    {
        Ride FindRideById(int id);
        IEnumerable<Ride> FindRidesByDriver(string email);
        Task<IEnumerable<Ride>> FindRidesByDate(DateTime date, ClaimsPrincipal User);
        IEnumerable<Ride> FindRidesByDestination(Address address);
        IEnumerable<Ride> FindRidesByStartPoint(int addressFromId);
        IEnumerable<Passenger> FindPassengersByRideId(int rideId);
        bool UpdateRide(Ride ride);
        void AddRide(Ride ride);
    }
}
