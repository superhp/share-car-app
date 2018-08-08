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
        IEnumerable<Ride> FindRidesByDate(DateTime date);
        IEnumerable<Ride> FindRidesByDestination(int addressToId);
        IEnumerable<Ride> FindRidesByStartPoint(int addressFromId);
        IEnumerable<Passenger> FindPassengersByRideId(int rideId);
        //       Task<IEnumerable<Passenger>> FindRidesByPassenger(ClaimsPrincipal User);
        bool UpdateRide(Ride ride);
        bool DeleteRide(Ride ride);
        void AddRide(Ride ride);
        IEnumerable<Ride> FindSimmilarRides(string driverEmail, int routeId, int rideId);

    }
}
