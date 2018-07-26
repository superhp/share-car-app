using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShareCar.Logic.Ride_Logic
{
   public interface IRideRepository
    {
        Ride FindRideById(int id);
        IEnumerable<Ride> FindRidesByDriver(string email);
        Task<IEnumerable<Ride>> FindRidesByDate(DateTime date, ClaimsPrincipal User);
        IEnumerable<Ride> FindRidesByDestination(Address address);
        Task<IEnumerable<Ride>> FindRidesByStartPoint(int addressFromId, ClaimsPrincipal User);
        IEnumerable<Passenger> FindPassengersByRideId(int rideId);
        bool UpdateRide(Ride ride);
        void AddRide(Ride ride);
    }
}
