using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Logic.RideRequest_Logic
{
    public interface IRideRequestLogic
    {
        System.Threading.Tasks.Task<IEnumerable<RequestDto>> FindUsersRequests(bool driver, string email);
        bool UpdateRequest(RequestDto request);
        Task<bool> AddRequest(RequestDto request);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);

    }
}
