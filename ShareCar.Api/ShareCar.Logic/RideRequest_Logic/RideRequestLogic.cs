using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using ShareCar.Dto;
using ShareCar.Logic.Address_Logic;
using ShareCar.Logic.Person_Logic;
using ShareCar.Logic.Ride_Logic;

namespace ShareCar.Logic.RideRequest_Logic
{
    public class RideRequestLogic : IRideRequestLogic
    {

        private readonly IRideRequestRepository _rideRequestRepository;
        private readonly IRideLogic _rideLogic;
        private readonly IPersonLogic _personLogic;
        private readonly IAddressLogic _addressLogic;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public RideRequestLogic(IRideRequestRepository defaultRepository, IPersonLogic personLogic, IAddressLogic addressLogic, IRideLogic rideLogic, UserManager<User> userManager, IMapper mapper)
        {
            _rideRequestRepository = defaultRepository;
            _personLogic = personLogic;
            _addressLogic = addressLogic;
            _rideLogic = rideLogic;
            _userManager = userManager;
            _mapper = mapper;
        }

        public bool AddRequest(RideRequestDto requestDto)
        {
            requestDto.SeenByDriver = false;
            requestDto.SeenByPassenger = true;
            string driverEmail = _rideLogic.FindRideById(requestDto.RideId).DriverEmail;
            requestDto.DriverEmail = driverEmail;    
            int addressId = _addressLogic.GetAddressId(new AddressDto { City = requestDto.City, Street = requestDto.Street, Number = requestDto.HouseNumber});

            requestDto.AddressId = addressId;
            return  _rideRequestRepository.AddRequest(_mapper.Map<RideRequestDto, Request>(requestDto));           
        }

        public bool UpdateRequest(RideRequestDto request)
        {
            request.SeenByPassenger = false;            

            return _rideRequestRepository.UpdateRequest(_mapper.Map<RideRequestDto, Request>(request));
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

                return await ConvertRequestsToDtoAsync(entityRequest, driver);
            }
        

        public async Task<List<RideRequestDto>> ConvertRequestsToDtoAsync(IEnumerable<Request> entityRequests, bool isDriver)
        {
            List<RideRequestDto> dtoRequests = new List<RideRequestDto>();
            int count = 0;
            foreach (var request in entityRequests)
            {
                dtoRequests.Add(_mapper.Map<Request, RideRequestDto>(request));

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

                dtoRequests[count].RideDate = _rideLogic.FindRideById(request.RideId).RideDateTime;
                count++;

            }
            return dtoRequests;
        }

    }
}
