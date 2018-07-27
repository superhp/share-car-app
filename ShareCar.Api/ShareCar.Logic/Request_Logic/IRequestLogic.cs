using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Request_Logic
{
    public interface IRequestLogic
    {
        RequestDto FindRequestByRequestId(int id);
        IEnumerable<RequestDto> FindRequestsByPassengerEmail(string email);
        IEnumerable<RequestDto> FindRequestsByDriverEmail(string email);
        IEnumerable<RequestDto> FindRidesByPickUpPoint(AddressDto address);
        IEnumerable<RequestDto> FindRequestByRideId(int rideId);
        bool UpdateRequest(RequestDto request);
        bool AddRequest(RequestDto request);
    }
}
