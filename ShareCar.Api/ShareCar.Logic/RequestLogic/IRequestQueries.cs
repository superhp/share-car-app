using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;

namespace ShareCar.Logic.RequestLogic
{
    public interface IRequestQueries
    {
        Request FindRequestByRequestId(int id);
        IEnumerable<Request> FindRequestsByPassengerEmail(string email);
        IEnumerable<Request> FindRequestsByDriverEmail(string email);
        IEnumerable<Request> FindRidesByPickUpPoint(Address address);
        IEnumerable<Request> FindRequestByRideId(int rideId);
        bool UpdateRequest(Request request);
        bool AddRequest(Request request);
    }
}
