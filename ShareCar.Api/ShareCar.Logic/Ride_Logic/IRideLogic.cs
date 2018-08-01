using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ShareCar.Dto;

namespace ShareCar.Logic.Ride_Logic
{
    public interface IRideLogic
    {
        IEnumerable<RideDto> FindRidesByDriver(string email);
        RideDto FindRideById(int id);
        IEnumerable<RideDto> FindRidesByDate(DateTime date);
        IEnumerable<RideDto> FindRidesByDestination(int addressToId);
        IEnumerable<RideDto> FindRidesByStartPoint(int adressFromId);
        IEnumerable<PassengerDto> FindPassengersByRideId(int rideId);
        bool DoesUserBelongsToRide(string email, int rideId);
       // Task<IEnumerable<PassengerDto>> FindRidesByPassenger(ClaimsPrincipal User);
        bool UpdateRide(RideDto ride);
        bool AddRide(RideDto ride);

    }
}
