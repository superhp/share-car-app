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

namespace ShareCar.Logic.RideRequest_Logic
{
    public class RideRequestLogic : IRideRequestLogic
    {

        private readonly IRideRequestRepository _rideRequestRepository;
        private readonly IRideLogic _rideLogic;
        private readonly IPassengerLogic _passengerLogic;
        private readonly IAddressLogic _addressLogic;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public RideRequestLogic(IRideRequestRepository rideRequestRepository, IUserLogic personLogic, IAddressLogic addressLogic, UserManager<User> userManager, IMapper mapper, IPassengerLogic passengerLogic, IRideLogic rideLogic)
        {
            _rideRequestRepository = rideRequestRepository;
            _addressLogic = addressLogic;
            _rideLogic = rideLogic;
            _userManager = userManager;
            _mapper = mapper;
            _passengerLogic = passengerLogic;
        }

        public bool AddRequest(RideRequestDto requestDto, string driverEmail)
        {
            requestDto.SeenByDriver = false;
            requestDto.SeenByPassenger = true;
            requestDto.DriverEmail = driverEmail;
            int addressId = _addressLogic.GetAddressId(new AddressDto { Longtitude = requestDto.Longtitude, Latitude = requestDto.Latitude });

            requestDto.AddressId = addressId;
            var isCreated = _rideRequestRepository.AddRequest(_mapper.Map<RideRequestDto, Request>(requestDto));
            return isCreated;
        }

        public bool UpdateRequest(RideRequestDto request)
        {
            request.SeenByPassenger = false;
            var isUpdated =_rideRequestRepository.UpdateRequest(_mapper.Map<RideRequestDto, Request>(request));
            if (isUpdated && request.Status == Dto.Status.ACCEPTED)
            {
                _passengerLogic.AddPassenger(new PassengerDto { Email = request.DriverEmail, RideId = request.RideId, Completed = false });
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

        public async Task<IEnumerable<RideRequestDto>> FindUsersRequests(bool driver, string email)
        {

            IEnumerable<Request> entityRequest;
            if (driver)
            {
                entityRequest = _rideRequestRepository.FindDriverRequests(email);                
            }
            else
            {
                entityRequest = _rideRequestRepository.FindPassengerRequests(email);
            }

               IEnumerable<RideRequestDto> converted =  await ConvertRequestsToDtoAsync(entityRequest, driver);
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

        public async Task<List<RideRequestDto>> ConvertRequestsToDtoAsync(IEnumerable<Request> entityRequests, bool isDriver)
        {
            List<RideRequestDto> dtoRequests = new List<RideRequestDto>();
            int count = 0;
            foreach (var request in entityRequests)
            {
                dtoRequests.Add(_mapper.Map<Request,RideRequestDto>(request));

             
                    if (isDriver)
                    {
                        var user = await _userManager.FindByEmailAsync(request.PassengerEmail);
                        dtoRequests[count].PassengerFirstName = user.FirstName;
                        dtoRequests[count].PassengerLastName = user.LastName;
                    }
                    else
                    {
                        var user = await _userManager.FindByEmailAsync(request.DriverEmail);
                        dtoRequests[count].PassengerFirstName = user.FirstName;
                        dtoRequests[count].PassengerLastName = user.LastName;
                    }


                    AddressDto address = _addressLogic.FindAddressById(request.AddressId);

                    dtoRequests[count].City = address.City;
                    dtoRequests[count].Street = address.Street;
                    dtoRequests[count].HouseNumber = address.Number;
                    dtoRequests[count].Longtitude = address.Longtitude;
                    dtoRequests[count].Latitude = address.Latitude;

                    //dtoRequests[count].RideDate = _rideLogic.FindRideById(request.RideId).RideDateTime;
                    count++;
            }
            return dtoRequests;
        }

        //Changes request status to deleted
        public void DeletedRide(int rideId)
        {
            IEnumerable<Request> entityRequests = _rideRequestRepository.FindRequestsByRideId(rideId);
            _rideRequestRepository.DeletedRide(entityRequests);
        }

        public List<RideRequestDto> GetAcceptedRequests(string passengerEmail)
        {
            IEnumerable<Request> entityRequests = _rideRequestRepository.GetAcceptedRequests(passengerEmail);
            List<RideRequestDto> dtoRequests = new List<RideRequestDto>();
            foreach(Request request in entityRequests)
            {
                dtoRequests.Add(_mapper.Map<Request, RideRequestDto>(request));
            }
            return dtoRequests;
        }
    }
}
