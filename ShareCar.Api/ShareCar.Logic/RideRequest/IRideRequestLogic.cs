using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace ShareCar.Logic.RideRequest_Logic
{
    public interface IRideRequestLogic
    {
        System.Threading.Tasks.Task<IEnumerable<RequestDto>> FindUsersRequests(bool driver, string email);
        bool UpdateRequest(RequestDto request);
        bool AddRequest(RequestDto request);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);

    }
}
