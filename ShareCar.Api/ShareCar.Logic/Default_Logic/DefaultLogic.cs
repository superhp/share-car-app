using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Ride_Logic;

namespace ShareCar.Logic.Default_Logic
{
    public class DefaultLogic : IDefaultLogic
    {

        private readonly IDefaultRepository _defaultRepository;
        //   private RideMapper _rideMapper = new RideMapper();
        //     private PassengerMapper _passengerMapper = new PassengerMapper();
        //  private AddressMapper _addressMapper = new AddressMapper();
        private readonly IRideLogic _rideLogic;
        public DefaultLogic(IDefaultRepository defaultRepository)
        {
            _defaultRepository = defaultRepository;
        }

        public bool AddRequest(RequestDto requestDto)
        {     



           return  _defaultRepository.AddRequest(MapToEntity(requestDto));           
        }

        public IEnumerable<RequestDto> FindUsersRequests(bool driver, string email)
        {

            if (driver)
            {
                IEnumerable<Request> entityRequest = _defaultRepository.FindDriverRequests(email);

                List<RequestDto> dtoRequests = new List<RequestDto>();// = new IEnumerable<RequestDto>();
                foreach (var request in entityRequest)
                {
                    dtoRequests.Add(MapToDto(request));
                }
                return dtoRequests;
            }
            else
            {
                IEnumerable<Request> entityRequest = _defaultRepository.FindPassengerRequests(email);

                List<RequestDto> dtoRequests = new List<RequestDto>();// = new IEnumerable<RequestDto>();
                foreach (var request in entityRequest)
                {
                    dtoRequests.Add(MapToDto(request));
                }
                return dtoRequests;
            }

        }

        public bool UpdateRequest(RequestDto request)
        {
            return _defaultRepository.UpdateRequest(MapToEntity(request));
        }

        private Request MapToEntity(RequestDto dtoRequest)
        {
            Request request = new Request();

            request.Status = (Db.Entities.Status)dtoRequest.Status;
            request.PassengerEmail = dtoRequest.PassengerEmail;
            request.DriverEmail = dtoRequest.DriverEmail;

            request.RequestId = dtoRequest.RequestId;
            request.AddressId = dtoRequest.AddressId;

            return request;
        }

        private RequestDto MapToDto(Request requestEntity)
        {
            RequestDto request = new RequestDto();

            request.Status = (Dto.Identity.Status)requestEntity.Status;
            request.PassengerEmail = requestEntity.PassengerEmail;
            request.DriverEmail = requestEntity.DriverEmail;

            request.RequestId = requestEntity.RequestId;
            request.AddressId = requestEntity.AddressId;

            return request;
        }

    }
}
