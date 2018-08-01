using ShareCar.Dto;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace ShareCar.Logic.RideRequest_Logic
{
    public interface IRideRequestLogic
    {
        System.Threading.Tasks.Task<IEnumerable<RideRequestDto>> FindUsersRequests(bool driver, string email);
        bool UpdateRequest(RideRequestDto request);
        bool AddRequest(RideRequestDto request);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);

    }
}
