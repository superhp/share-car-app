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
        Task<IEnumerable<Ride>> FindRidesByDestination(int addressToId, ClaimsPrincipal User);
        Task<IEnumerable<Ride>> FindRidesByStartPoint(int addressFromId, ClaimsPrincipal User);
        Task<IEnumerable<Passenger>> FindPassengersByRideId(int rideId, ClaimsPrincipal User);
        bool UpdateRide(Ride ride);
        void AddRide(Ride ride);
    }
}
