using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShareCar.Db.Repositories
{
   public interface IRideRepository
    {
        Ride FindRideById(int id);
        IEnumerable<Ride> FindRidesByDriver(string email);
        Task<IEnumerable<Ride>> FindRidesByDate(DateTime date);
        Task<IEnumerable<Ride>> FindRidesByDestination(int addressToId);
        Task<IEnumerable<Passenger>> FindPassengersByRideId(int id, ClaimsPrincipal User);
        Task<IEnumerable<Ride>> FindRidesByStartPoint(int addressFromId, ClaimsPrincipal User);

 //       Task<IEnumerable<Passenger>> FindRidesByPassenger(ClaimsPrincipal User);
        bool UpdateRide(Ride ride);
        void AddRide(Ride ride);
    }
}
