using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ShareCar.Dto;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Ride_Logic
{
    public interface IRideLogic
    {
        //Task<List<RideDto>> FindFinishedPassengerRidesAsync(string passengerEmail);
        IEnumerable<RideDto> GetRidesByDriver(string email);
        RideDto GetRideById(int id);
        IEnumerable<RideDto> GetRidesByDate(DateTime date);
        IEnumerable<RideDto> GetRidesByDestination(int addressToId);
        IEnumerable<RideDto> GetRidesByStartPoint(int adressFromId);
        IEnumerable<PassengerDto> GetPassengersByRideId(int rideId);
        bool DoesUserBelongsToRide(string email, int rideId);
        Task<List<RideDto>> GetFinishedPassengerRidesAsync(string passengerEmail);
        bool SetRideAsInactive(RideDto ride);
        bool AddRide(RideDto ride, string email);
        bool UpdateRide(RideDto ride);
        IEnumerable<RideDto> GetSimilarRides(int rideId);
        Task<IEnumerable<RouteDto>> GetRoutesAsync(RouteDto routeDto, string email);
        Task<IEnumerable<RideDto>> GetRidesByRouteAsync(string routeGeometry);
    }
}
