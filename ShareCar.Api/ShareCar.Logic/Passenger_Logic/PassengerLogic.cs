using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using ShareCar.Dto;
using ShareCar.Logic.Address_Logic;
using AutoMapper;
using System.Linq;
using ShareCar.Db.Repositories;
using System.Threading.Tasks;
using ShareCar.Logic.Route_Logic;
using ShareCar.Logic.Ride_Logic;

namespace ShareCar.Logic.Passenger_Logic
{
    public class PassengerLogic : IPassengerLogic
    { 
        private readonly IRideRepository _rideRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly IAddressLogic _addressLogic;
        private readonly IRouteLogic _routeLogic;
        private readonly IRideLogic _rideLogic;
        private readonly IPassengerRepository _passengerRepository;
        private readonly IMapper _mapper;

        public PassengerLogic(IRouteLogic routeLogic, IRideRepository rideRepository, IAddressLogic addressLogic, IMapper mapper, IAddressRepository addressRepository, IPassengerRepository passengerRepository, IRideLogic rideLogic)
        {
            _rideRepository = rideRepository;
            _rideLogic = rideLogic;
            _addressLogic = addressLogic;
            _routeLogic = routeLogic;
            _mapper = mapper;
            _addressRepository = addressRepository;
            _passengerRepository = passengerRepository;
        }

        public bool AddPassenger(PassengerDto passenger)
        {


            //----WILL BE UNCOMMENTED ONCE VALIDATION APPEARS
            //  bool addNewRide = ValidateNewRide(); 

            bool addNewPassenger = true; // Will be deleted once validation appears

            if (addNewPassenger)
            {
                return _passengerRepository.AddNewPassenger(_mapper.Map<PassengerDto, Passenger>(passenger));
            }
            return false;
        }

    }
}
