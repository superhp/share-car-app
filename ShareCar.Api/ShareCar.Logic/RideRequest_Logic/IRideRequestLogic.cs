using System.Collections.Generic;
using System.Threading.Tasks;
using ShareCar.Dto;


namespace ShareCar.Logic.RideRequest_Logic
{
    public interface IRideRequestLogic
    {
        System.Threading.Tasks.Task<IEnumerable<RideRequestDto>> FindUsersRequests(bool driver, string email);
        bool UpdateRequest(RideRequestDto request);
        Task<bool> AddRequest(RideRequestDto request);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);

    }
}
