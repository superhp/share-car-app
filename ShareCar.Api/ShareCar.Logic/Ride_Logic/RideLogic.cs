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
using ShareCar.Logic.RideRequest_Logic;

namespace ShareCar.Logic.Ride_Logic
{
    public class RideLogic : IRideLogic
    {
        private readonly IRideRepository _rideRepository;
        private readonly IRouteRepository _routeRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly IAddressLogic _addressLogic;
        private readonly IRouteLogic _routeLogic;
        private readonly IMapper _mapper;
        private readonly IRideRequestLogic _rideRequestLogic;
        public RideLogic(IRouteLogic routeLogic, IRouteRepository routeRepository, IRideRepository rideRepository, IAddressLogic addressLogic, IMapper mapper, IAddressRepository addressRepository, IRideRequestLogic rideRequestLogic)
        {
            _rideRepository = rideRepository;
            _routeRepository = routeRepository;
            _addressLogic = addressLogic;
            _routeLogic = routeLogic;
            _mapper = mapper;
            _addressRepository = addressRepository;
            _rideRequestLogic = rideRequestLogic;
        }

        public RideDto FindRideById(int id)
        {
            Ride ride = _rideRepository.FindRideById(id);

            if (ride == null)
            {
                return null;
            }

            return _mapper.Map<Ride, RideDto>(ride);
        }

        public IEnumerable<RideDto> FindRidesByDate(DateTime date)
        {
            IEnumerable<Ride> rides = _rideRepository.FindRidesByDate(date);


            return MapToList(rides);
        }

        public IEnumerable<RideDto> FindRidesByDriver(string email)
        {
            IEnumerable<Ride> rides = _rideRepository.FindRidesByDriver(email);


            List<RideDto> dtoRide = new List<RideDto>();
            int count = 0;
            
            foreach (var ride in rides)
            {
                RouteDto route = _routeLogic.GetRouteById(ride.RouteId); 
                dtoRide.Add(_mapper.Map<Ride, RideDto>(ride));
                AddressDto fromAddress = _addressLogic.FindAddressById(route.FromId);
                dtoRide[count].FromCountry = fromAddress.Country;
                dtoRide[count].FromCity = fromAddress.City;
                dtoRide[count].FromStreet = fromAddress.Street;
                dtoRide[count].FromNumber = fromAddress.Number;
                AddressDto toAddress = _addressLogic.FindAddressById(route.ToId);
                dtoRide[count].ToCountry = toAddress.Country;
                dtoRide[count].ToCity = toAddress.City;
                dtoRide[count].ToStreet = toAddress.Street;
                dtoRide[count].ToNumber = toAddress.Number;
                count++;
            }
            return dtoRide;
        }


        public IEnumerable<RideDto> FindRidesByStartPoint(int addressFromId)
        {
            IEnumerable<Ride> rides = _rideRepository.FindRidesByStartPoint(addressFromId);
            return MapToList(rides);
        }

        public IEnumerable<RideDto> FindRidesByDestination(int addressToId)
        {
            IEnumerable<Ride> rides = _rideRepository.FindRidesByDestination(addressToId);
            return MapToList(rides);
        }
        public IEnumerable<PassengerDto> FindPassengersByRideId(int id)
        {
            IEnumerable<Passenger> passengers = _rideRepository.FindPassengersByRideId(id);

            return MapToList(passengers);
        }
        /*
        public async Task<IEnumerable<PassengerDto>> FindRidesByPassenger( User)
        {
            IEnumerable<Passenger> rides = await _rideRepository.FindRidesByPassenger(User);

            return MapToList(rides);
        }*/
        public bool UpdateRide(RideDto ride)
        {
            //ride.Passengers = new List<PassengerDto>();
            //ride.Requests = new List<RideRequestDto>();

            //----WILL BE UNCOMMENTED ONCE VALIDATION APPEARS
            //  bool addNewRide = ValidateNewRide(); 

            bool addNewRide = true; // Will be deleted once validation appears

            if (addNewRide)
            {
                ParseExtraRideDtoData(ride);
                return _rideRepository.UpdateRide(_mapper.Map<RideDto, Ride>(ride));
            }
            return false;
        }

        public bool AddRide(RideDto ride, string email)
        {

            if (ride.DriverEmail == null)
            {
                ride.DriverEmail = email;
            }

            ride.Passengers = new List<PassengerDto>();
            ride.Requests = new List<RideRequestDto>();

            //----WILL BE UNCOMMENTED ONCE VALIDATION APPEARS
            //  bool addNewRide = ValidateNewRide(); 

            bool addNewRide = true; // Will be deleted once validation appears

            if (addNewRide)
            {
                ParseExtraRideDtoData(ride);

                _rideRepository.AddRide(_mapper.Map<RideDto, Ride>(ride));
                RouteDto routeDto = _routeLogic.GetRouteById(ride.RouteId);
                
                return true;
                
            }
            return false;
        }

        public bool DeleteRide(RideDto rideDto)
        {
            
            _rideRequestLogic.DeletedRide(rideDto.RideId);
           return _rideRepository.DeleteRide(_mapper.Map<RideDto, Ride>(rideDto));
        }

        public bool DoesUserBelongsToRide(string email, int rideId)
        {
            Ride ride = _rideRepository.FindRideById(rideId);
            if (ride.DriverEmail == email || ride.Passengers.Any(x => x.Email == email))
            {
                return true;
            }
            return false;
        }

        // Method checks if updated/added ride won't have same time as other ride of same driver
        private bool ValidateNewRide()
        {
            // Ride Entity should have arival time
            throw new NotImplementedException();
        }

        // Returns a list of mapped objects
        private IEnumerable<RideDto> MapToList(IEnumerable<Ride> rides)
        {
            List<RideDto> DtoRides = new List<RideDto>();

            foreach (var ride in rides)
            {
                DtoRides.Add(_mapper.Map<Ride, RideDto>(ride));
            }
            return DtoRides;
        }

        private IEnumerable<PassengerDto> MapToList(IEnumerable<Passenger> passengers)
        {
            List<PassengerDto> DtoPassengers = new List<PassengerDto>();

            foreach (var passenger in passengers)
            {
                DtoPassengers.Add(_mapper.Map<Passenger, PassengerDto>(passenger));
            }
            return DtoPassengers;
        }

        public IEnumerable<RideDto> FindSimilarRides(int rideId)
        {
            Ride ride = _rideRepository.FindRideById(rideId);
            string driverEmail = ride.DriverEmail;
            int routeId = ride.RouteId;
            IEnumerable<Ride> rides = _rideRepository.FindSimmilarRides(driverEmail, routeId, ride.RideId);
            return MapToList(rides);

        }

        private void ParseExtraRideDtoData(RideDto ride)
        {
            AddressDto fromAddress = new AddressDto
            {
                Country = ride.FromCountry,
                City = ride.FromCity,
                Street = ride.FromStreet,
                Number = ride.FromNumber
            };
            AddressDto toAddress = new AddressDto
            {
                Country = ride.ToCountry,
                City = ride.ToCity,
                Street = ride.ToStreet,
                Number = ride.ToNumber
            };
            //ADD ADDRESS VALIDATION WITH LONGTITUDE AND LATITUDE
           
            if(fromAddress.Street != null && fromAddress.Number != null && toAddress.Street != null && toAddress.Number != null)
            {
                RouteDto route = new RouteDto();
                route.FromId = _addressLogic.GetAddressId(fromAddress);
                route.ToId = _addressLogic.GetAddressId(toAddress);
                if (route.FromId == -1)
                {
                    if(fromAddress.Street!=null && fromAddress.Number!=null)
                    {
                        _addressRepository.AddNewAddress(_mapper.Map<AddressDto, Address>(fromAddress));
                    }
                
                    route.FromId = _addressLogic.GetAddressId(fromAddress);
                }
                if (route.ToId == -1)
                {
                    _addressRepository.AddNewAddress(_mapper.Map<AddressDto, Address>(toAddress));
                    route.ToId = _addressLogic.GetAddressId(toAddress);
                }
                int routeId = _routeLogic.GetRouteId(route.FromId, route.ToId);
                if (routeId == -1)
                {
                    _routeLogic.AddRoute(route);
                    ride.RouteId = _routeLogic.GetRouteId(route.FromId, route.ToId);
                }
                else
                {
                    ride.RouteId = routeId;
                }
            }
            
        }
    }
}
