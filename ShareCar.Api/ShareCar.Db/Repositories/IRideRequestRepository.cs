using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories
{
    public interface IRideRequestRepository
    {

        bool AddRequest(Request request);
        Request FindRequestById(int id);
        IEnumerable<Request> FindPassengerRequests(string email);
        IEnumerable<Request> FindDriverRequests(string email);
        bool UpdateRequest(Request request);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);
        void DeletedRide(IEnumerable<Request> requests);
        IEnumerable<Request> FindRequestsByRideId(int rideId);
    }
}
