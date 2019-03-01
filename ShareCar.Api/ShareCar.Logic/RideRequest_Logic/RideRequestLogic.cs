using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using ShareCar.Dto;
using ShareCar.Logic.Address_Logic;
using ShareCar.Logic.User_Logic;
using ShareCar.Logic.Ride_Logic;
using ShareCar.Db.Repositories;
using AutoMapper;
using ShareCar.Logic.Route_Logic;
using ShareCar.Logic.Passenger_Logic;
using ShareCar.Db.Repositories.RideRequest_Repository;

namespace ShareCar.Logic.RideRequest_Logic
{
    public class RideRequestLogic : IRideRequestLogic
    {

        private readonly IRideRequestRepository _rideRequestRepository;
        private readonly IRideLogic _rideLogic;
        private readonly IPassengerLogic _passengerLogic;
        private readonly IAddressLogic _addressLogic;
        private readonly IMapper _mapper;
        private readonly IUserLogic _userLogic;

        public RideRequestLogic(IRideRequestRepository rideRequestRepository, IUserLogic personLogic, IAddressLogic addressLogic, IUserLogic userLogic, IMapper mapper, IPassengerLogic passengerLogic, IRideLogic rideLogic)
        {
            _rideRequestRepository = rideRequestRepository;
            _addressLogic = addressLogic;
            _rideLogic = rideLogic;
            _userLogic = userLogic;
            _mapper = mapper;
            _passengerLogic = passengerLogic;
        }

        public bool AddRequest(RideRequestDto requestDto, string driverEmail)
        {
            requestDto.SeenByDriver = false;
            requestDto.SeenByPassenger = true;
            requestDto.DriverEmail = driverEmail;
            int addressId = _addressLogic.GetAddressId(new AddressDto {City=requestDto.City, Street = requestDto.Street, Number = requestDto.HouseNumber, Longtitude = requestDto.Longtitude, Latitude = requestDto.Latitude });

            requestDto.AddressId = addressId;
            var isCreated = _rideRequestRepository.AddRequest(_mapper.Map<RideRequestDto, RideRequest>(requestDto));
            return isCreated;
        }

        public bool UpdateRequest(RideRequestDto request)
        {
            request.SeenByPassenger = false;
            var isUpdated =_rideRequestRepository.UpdateRequest(_mapper.Map<RideRequestDto, RideRequest>(request));
            if (isUpdated && request.Status == Dto.Status.ACCEPTED)
            {
                var entityRequest = _rideRequestRepository.GetRequestById(request.RequestId);      
                var rideToUpdate = _rideLogic.GetRideById(request.RideId);
                if (rideToUpdate.NumberOfSeats != 0)
                {
                    var added = _passengerLogic.AddPassenger(new PassengerDto { Email = entityRequest.PassengerEmail, RideId = request.RideId, Completed = false });
                    if (added)
                    {
                        rideToUpdate.NumberOfSeats--;
                        var updatedSeats = _rideLogic.UpdateRide(rideToUpdate);
                    }
                    return true;
                } else
                {
                    return false;
                }
            }
            return isUpdated;
        }

        void IRideRequestLogic.SeenByPassenger(int[] requests)
        {
            _rideRequestRepository.SeenByPassenger(requests);
        }

        void IRideRequestLogic.SeenByDriver(int[] requests)
        {
            _rideRequestRepository.SeenByDriver(requests);
        }

        public IEnumerable<RideRequestDto> GetUsersRequests(bool driver, string email)
        {

            IEnumerable<RideRequest> entityRequest;
            if (driver)
            {
                entityRequest = _rideRequestRepository.GetDriverRequests(email);
            }
            else
            {
                entityRequest = _rideRequestRepository.GetPassengerRequests(email);
            }

            IEnumerable<RideRequestDto> converted = ConvertRequestsToDto(entityRequest, driver);
            return SortRequests(converted);
        }

        public List<RideRequestDto> SortRequests(IEnumerable<RideRequestDto> requests)
        {
            List<RideRequestDto> sorted = new List<RideRequestDto>();

            foreach(var request in requests)
            {
                if(!request.SeenByPassenger)
                {
                    sorted.Add(request);
                }
            }
            foreach (var request in requests)
            {
                if (request.Status == Dto.Status.WAITING)
                {
                    sorted.Add(request);
                }
            }
            foreach (var request in requests)
            {
                if (request.Status == Dto.Status.ACCEPTED && request.SeenByPassenger)
                {
                    sorted.Add(request);
                }
            }
            return sorted;

        }

        public List<RideRequestDto> ConvertRequestsToDto(IEnumerable<RideRequest> entityRequests, bool isDriver)
        {
            List<RideRequestDto> dtoRequests = new List<RideRequestDto>();

            int count = 0;
            foreach (var request in entityRequests)
            {
                dtoRequests.Add(_mapper.Map<RideRequest, RideRequestDto>(request));


                if (isDriver)
                {
                    var user = _userLogic.GetUserByEmail(EmailType.LOGIN, request.PassengerEmail);
                    dtoRequests[count].PassengerFirstName = user.FirstName;
                    dtoRequests[count].PassengerLastName = user.LastName;
                }
                else
                {
                    var user = _userLogic.GetUserByEmail(EmailType.LOGIN, request.DriverEmail);
                    dtoRequests[count].DriverFirstName = user.FirstName;
                    dtoRequests[count].DriverLastName = user.LastName;
                }

                AddressDto address = _addressLogic.GetAddressById(request.AddressId);

                dtoRequests[count].City = address.City;
                dtoRequests[count].Street = address.Street;
                dtoRequests[count].HouseNumber = address.Number;
                dtoRequests[count].Longtitude = address.Longtitude;
                dtoRequests[count].Latitude = address.Latitude;
                RideDto ride = _rideLogic.GetRideById(request.RideId);
                if (ride != null)
                {
                    dtoRequests[count].RideDate = ride.RideDateTime;
                }
                else
                {
                    dtoRequests[count].RideDate = new System.DateTime();
                }
                count++;
            }
            return dtoRequests;
        }

        //Changes request status to deleted
        public bool DeletedRide(int rideId)
        {
            IEnumerable<RideRequest> entityRequests = _rideRequestRepository.GetRequestsByRideId(rideId);
            return _rideRequestRepository.DeletedRide(entityRequests);
        }
        
        public List<RideRequestDto> GetAcceptedRequests(string passengerEmail)
        {
            IEnumerable<RideRequest> entityRequests = _rideRequestRepository.GetAcceptedRequests(passengerEmail);
            List<RideRequestDto> dtoRequests = new List<RideRequestDto>();
            foreach(RideRequest request in entityRequests)
            {
                dtoRequests.Add(_mapper.Map<RideRequest, RideRequestDto>(request));
            }
            return dtoRequests;
        }
    }
}
