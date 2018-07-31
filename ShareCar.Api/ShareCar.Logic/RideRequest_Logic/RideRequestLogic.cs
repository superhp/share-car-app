using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Address_Logic;
using ShareCar.Logic.Person_Logic;
using ShareCar.Logic.Ride_Logic;

namespace ShareCar.Logic.RideRequest_Logic
{
    public class RideRequestLogic : IRideRequestLogic
    {

        private readonly IRideRequestRepository _defaultRepository;
        //   private RideMapper _rideMapper = new RideMapper();
        //     private PassengerMapper _passengerMapper = new PassengerMapper();
        //  private AddressMapper _addressMapper = new AddressMapper();
        private readonly IRideLogic _rideLogic;
        private readonly IPersonLogic _personLogic;
        private readonly IAddressLogic _addressLogic;

        public RideRequestLogic(IRideRequestRepository defaultRepository, IPersonLogic personLogic, IAddressLogic addressLogic, IRideLogic rideLogic)
        {
            _defaultRepository = defaultRepository;
            _personLogic = personLogic;
            _addressLogic = addressLogic;
            _rideLogic = rideLogic;
        }

        public bool AddRequest(RequestDto requestDto)
        {
            requestDto.SeenByDriver = false;
            requestDto.SeenByPassenger = true;
            string driverEmail = _rideLogic.FindRideById(requestDto.RideId).DriverEmail;
            requestDto.DriverEmail = driverEmail;
           return  _defaultRepository.AddRequest(MapToEntity(requestDto));           
        }

        public IEnumerable<RequestDto> FindUsersRequests(bool driver, string email)
        {
            if (driver)
            {
                IEnumerable<Request> entityRequest = _defaultRepository.FindDriverRequests(email);

                List<RequestDto> dtoRequests = new List<RequestDto>();// = new IEnumerable<RequestDto>();
                int count = 0;
                foreach (var request in entityRequest)
                {
                    PersonDto passenger = _personLogic.GetPersonByEmail(request.PassengerEmail);

                    dtoRequests.Add(MapToDto(request));
                    dtoRequests[count].PassengerFirstName = passenger.FirstName;
                    dtoRequests[count].PassengerLastName = passenger.LastName;

                    AddressDto address = _addressLogic.GetAddressById(request.AddressId);

                    dtoRequests[count].Address = address.City + "  " + address.Street + "  " + address.Number;
                    dtoRequests[count].RideDate = _rideLogic.FindRideById(request.RideId).RideDateTime;
                    count++;
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
            request.SeenByPassenger = false;            

            return _defaultRepository.UpdateRequest(MapToEntity(request));
        }

        private Request MapToEntity(RequestDto dtoRequest)
        {
            Request request = new Request();

            request.Status = (Db.Entities.Status)dtoRequest.Status;
            request.PassengerEmail = dtoRequest.PassengerEmail;
            request.DriverEmail = dtoRequest.DriverEmail;

            request.RideId = dtoRequest.RideId;
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
