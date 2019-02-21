using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories.RideRequest_Repository
{
    public interface IRideRequestRepository
    {
        IEnumerable<RideRequest> GetAcceptedRequests(string passengerEmail);
        void AddRequest(RideRequest request);
        RideRequest FindRequestById(int id);
        IEnumerable<RideRequest> FindPassengerRequests(string email);
        IEnumerable<RideRequest> FindDriverRequests(string email);
        void UpdateRequest(RideRequest request);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);
        void DeletedRide(IEnumerable<RideRequest> requests);
        IEnumerable<RideRequest> FindRequestsByRideId(int rideId);
    }
}
