using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories.RideRequest_Repository
{
    public interface IRideRequestRepository
    {
        IEnumerable<Request> GetAcceptedRequests(string passengerEmail);
        bool AddRequest(Request request);
        Request GetRequestById(int id);
        IEnumerable<Request> GetPassengerRequests(string email);
        IEnumerable<Request> GetDriverRequests(string email);
        bool UpdateRequest(Request request);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);
        bool DeletedRide(IEnumerable<Request> requests);
        IEnumerable<Request> GetRequestsByRideId(int rideId);
    }
}
