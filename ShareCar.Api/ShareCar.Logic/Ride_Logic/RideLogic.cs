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
using Microsoft.AspNetCore.Identity;
using ShareCar.Logic.Passenger_Logic;
using ShareCar.Db.Repositories.Ride_Repository;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Ride_Logic
{
    public class RideLogic : IRideLogic
    {
        private readonly IRideRepository _rideRepository;
        private readonly IAddressLogic _addressLogic;
        private readonly IRouteLogic _routeLogic;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IPassengerLogic _passengerLogic;

        public RideLogic(IRouteLogic routeLogic, IRideRepository rideRepository, IAddressLogic addressLogic, IMapper mapper, UserManager<User> userManager, IPassengerLogic passengerLogic)
        {
            _rideRepository = rideRepository;
            _addressLogic = addressLogic;
            _routeLogic = routeLogic;
            _mapper = mapper;
            _userManager = userManager;
            _passengerLogic = passengerLogic;
        }

        public RideDto GetRideById(int id)
        {
            Ride ride = _rideRepository.GetRideById(id);

            if (ride == null)
            {
                return null;
            }

            return _mapper.Map<Ride, RideDto>(ride);
        }

        public IEnumerable<RideDto> GetRidesByDate(DateTime date)
        {
            IEnumerable<Ride> rides = _rideRepository.GetRidesByDate(date);


            return MapToList(rides);
        }

        public IEnumerable<RideDto> GetRidesByDriver(string email)
        {
            IEnumerable<Ride> rides = _rideRepository.GetRidesByDriver(email);


            List<RideDto> dtoRides = new List<RideDto>();
            int count = 0;
            


            foreach (var ride in rides)
            {

                RouteDto route = _routeLogic.GetRouteById(ride.RouteId); 
                dtoRides.Add(_mapper.Map<Ride, RideDto>(ride));
                AddressDto fromAddress = _addressLogic.GetAddressById(route.FromId);
                dtoRides[count].FromCountry = fromAddress.Country;
                dtoRides[count].FromCity = fromAddress.City;
                dtoRides[count].FromStreet = fromAddress.Street;
                dtoRides[count].FromNumber = fromAddress.Number;
                AddressDto toAddress = _addressLogic.GetAddressById(route.ToId);
                dtoRides[count].ToCountry = toAddress.Country;
                dtoRides[count].ToCity = toAddress.City;
                dtoRides[count].ToStreet = toAddress.Street;
                dtoRides[count].ToNumber = toAddress.Number;
                count++;
            }
            AddCoordinatesToRequests(dtoRides);
            return dtoRides;
        }

        private void AddCoordinatesToRequests(List<RideDto> rides)
        {
            foreach (RideDto ride in rides)
            {
                foreach (RideRequestDto request in ride.Requests)
                {
                    AddressDto address = _addressLogic.GetAddressById(request.AddressId);
                    request.Longtitude = address.Longtitude;
                    request.Latitude = address.Latitude;
                }
            }
        }

        public IEnumerable<RideDto> GetRidesByStartPoint(int addressFromId)
        {
            IEnumerable<Ride> rides = _rideRepository.GetRidesByStartPoint(addressFromId);
            return MapToList(rides);
        }

        public IEnumerable<RideDto> GetRidesByDestination(int addressToId)
        {
            IEnumerable<Ride> rides = _rideRepository.GetRidesByDestination(addressToId);
            return MapToList(rides);
        }

        public IEnumerable<PassengerDto> GetPassengersByRideId(int id)
        {
            IEnumerable<Passenger> passengers = _rideRepository.GetPassengersByRideId(id);

            return MapToList(passengers);
        }
        
        public void AddRide(RideDto ride, string email)
        {

             ride.DriverEmail = email;        

            ride.Requests = new List<RideRequestDto>();

                ParseExtraRideDtoData(ride);

                _rideRepository.AddRide(_mapper.Map<RideDto, Ride>(ride));

        }

        public void SetRideAsInactive(RideDto rideDto)
        {           

             _rideRepository.SetRideAsInactive(_mapper.Map<RideDto, Ride>(rideDto));
        }

        public bool DoesUserBelongsToRide(string email, int rideId)
        {
            Ride ride = _rideRepository.GetRideById(rideId);
            if (ride.DriverEmail == email || ride.Passengers.Any(x => x.Email == email))
            {
                return true;
            }
            return false;
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

        private void ParseExtraRideDtoData(RideDto ride)
        {
            AddressDto fromAddress = new AddressDto
            {
                City = ride.FromCity,
                Street = ride.FromStreet,
                Number = ride.FromNumber
            };
            AddressDto toAddress = new AddressDto
            {
                City = ride.ToCity,
                Street = ride.ToStreet,
                Number = ride.ToNumber
            };



            if (fromAddress.Street != null && fromAddress.Number != null && toAddress.Street != null && toAddress.Number != null)
            {
                RouteDto route = new RouteDto();
                route.FromId = _addressLogic.GetAddressId(fromAddress);
                route.ToId = _addressLogic.GetAddressId(toAddress);
                route.Geometry = ride.RouteGeometry;
                route.AddressFrom = fromAddress;
                route.AddressTo = toAddress;

                int routeId = _routeLogic.GetRouteId(route.FromId, route.ToId);
                if (routeId == -1)
                {
                    route.Geometry = ride.RouteGeometry;
                    _routeLogic.AddRoute(route);
                    ride.RouteId = _routeLogic.GetRouteId(route.FromId, route.ToId);
                }
                else
                {
                    ride.RouteId = routeId;
                }
            }

        }

        public async Task<IEnumerable<RouteDto>> GetRoutesAsync(RouteDto routeDto, string email)
        {
            List<RouteDto> routes = _routeLogic.GetRoutes(routeDto, email);
            foreach (RouteDto route in routes)
            {
                await AddDriversInfoToRidesAsync(route.Rides);
            }
            return routes;

        }

        public async Task<List<RideDto>> GetFinishedPassengerRidesAsync(string passengerEmail)
        {
            List<PassengerDto> passengers = _passengerLogic.GetPassengersByEmail(passengerEmail);

            List<RideDto> dtoRides = new List<RideDto>();
            DateTime hourAfterRide = new DateTime();
            hourAfterRide = DateTime.Now;
               hourAfterRide.AddHours(1);
               foreach (PassengerDto passenger in passengers)
               {
                if (passenger.Ride != null)
                {
                    if (DateTime.Compare(passenger.Ride.RideDateTime, hourAfterRide) < 0)
                    {

                        var user = await _userManager.FindByEmailAsync(passenger.Ride.DriverEmail);
                        passenger.Ride.DriverFirstName = user.FirstName;
                        passenger.Ride.DriverLastName = user.LastName;
                        dtoRides.Add(passenger.Ride);
                    }
                }
     }
            return dtoRides;
        }

        public async Task<bool> AddDriversInfoToRidesAsync(List<RideDto> dtoRides)
        {
            List<string> Emails = new List<string>();
            List<string> FirstNames = new List<string>();
            List<string> LastNames = new List<string>();
            List<string> Phones = new List<string>();

            foreach (RideDto ride in dtoRides)
            {
                if (!Emails.Contains(ride.DriverEmail))
                {
                    Emails.Add(ride.DriverEmail);
                    User driver = await _userManager.FindByEmailAsync(ride.DriverEmail);
                    FirstNames.Add(driver.FirstName);
                    LastNames.Add(driver.LastName);
                    Phones.Add(driver.Phone);
                    ride.DriverFirstName = driver.FirstName;
                    ride.DriverLastName = driver.LastName;
                    ride.DriverPhone = driver.Phone;
                }
                else
                {
                    int index = Emails.IndexOf(ride.DriverEmail);
                    ride.DriverFirstName = FirstNames[index];
                    ride.DriverLastName = LastNames[index];
                    ride.DriverPhone = Phones[index];
                }
            }
            return true; // It is impossible to await void, so this method must return something
        }

        public async Task<IEnumerable<RideDto>> GetRidesByRouteAsync(string rideLogic)
        {
            IEnumerable<Ride> entityRides = _rideRepository.GetRidesByRoute(rideLogic);

            List<RideDto> dtoRides = (List<RideDto>) MapToList(entityRides);

            await AddDriversInfoToRidesAsync(dtoRides);

            return dtoRides;
        }

        public void UpdateRide(RideDto ride)
        {
            _rideRepository.UpdateRide(_mapper.Map<RideDto, Ride>(ride));
        }
    }
}
