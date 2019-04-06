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
using ShareCar.Logic.User_Logic;

namespace ShareCar.Logic.Ride_Logic
{
    public class RideLogic : IRideLogic
    {
        private readonly IRideRepository _rideRepository;
        private readonly IAddressLogic _addressLogic;
        private readonly IRouteLogic _routeLogic;
        private readonly IMapper _mapper;
        private readonly IUserLogic _userLogic;
        private readonly IPassengerLogic _passengerLogic;

        public RideLogic(IRouteLogic routeLogic, IRideRepository rideRepository, IAddressLogic addressLogic, IMapper mapper, IUserLogic userLogic, IPassengerLogic passengerLogic)
        {
            _rideRepository = rideRepository;
            _addressLogic = addressLogic;
            _routeLogic = routeLogic;
            _mapper = mapper;
            _userLogic = userLogic;
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


            List<RideDto> dtoRide = new List<RideDto>();
            int count = 0;



            foreach (var ride in rides)
            {

                RouteDto route = _routeLogic.GetRouteById(ride.RouteId);
                dtoRide.Add(_mapper.Map<Ride, RideDto>(ride));
                AddressDto fromAddress = _addressLogic.GetAddressById(route.FromId);
                dtoRide[count].FromCountry = fromAddress.Country;
                dtoRide[count].FromCity = fromAddress.City;
                dtoRide[count].FromStreet = fromAddress.Street;
                dtoRide[count].FromNumber = fromAddress.Number;
                dtoRide[count].FromLongitude = fromAddress.Longitude;
                dtoRide[count].FromLatitude = fromAddress.Latitude;

                AddressDto toAddress = _addressLogic.GetAddressById(route.ToId);
                dtoRide[count].ToCountry = toAddress.Country;
                dtoRide[count].ToCity = toAddress.City;
                dtoRide[count].ToStreet = toAddress.Street;
                dtoRide[count].ToNumber = toAddress.Number;
                dtoRide[count].ToLongitude = toAddress.Longitude;
                dtoRide[count].ToLatitude = toAddress.Latitude;
                count++;
            }
            return dtoRide;
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
        /*  
          public IEnumerable<RideDto> FindRidesByPassenger(PassengerDto passenger)
          {

              IEnumerable<Ride> rides =  _rideRepository.FindRidesByPassenger(_mapper.Map<PassengerDto,Passenger>(passenger));

              return MapToList(rides);
          }*/

        public void AddRide(RideDto ride, string email)
        {
            ride.DriverEmail = email;

            ride.Requests = new List<RideRequestDto>();

            AddRouteIdToRide(ride);

            _rideRepository.AddRide(_mapper.Map<RideDto, Ride>(ride));
        }

        public void SetRideAsInactive(RideDto rideDto)
        {
        _rideRepository.SetRideAsInactive(_mapper.Map<RideDto, Ride>(rideDto));
        }

        public bool DoesUserBelongsToRide(string email, int rideId)
        {
            Ride ride = _rideRepository.GetRideById(rideId);

            if (ride == null)
            {
                return false;
            }

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

        public IEnumerable<RideDto> GetSimilarRides(RideDto ride)
        {
            string driverEmail = ride.DriverEmail;
            int routeId = ride.RouteId;
            IEnumerable<Ride> rides = _rideRepository.GetSimmilarRides(driverEmail, routeId, ride.RideId);
            return MapToList(rides);
        }

        private void AddRouteIdToRide(RideDto ride)
        {
            AddressDto fromAddress = new AddressDto
            {
                City = ride.FromCity,
                Street = ride.FromStreet,
                Number = ride.FromNumber,
                Longitude = ride.FromLongitude,
                Latitude = ride.FromLatitude
            };
            AddressDto toAddress = new AddressDto
            {
                City = ride.ToCity,
                Street = ride.ToStreet,
                Number = ride.ToNumber,
                Longitude = ride.ToLongitude,
                Latitude = ride.ToLatitude
            };

            if (fromAddress.Longitude != 0 && fromAddress.Latitude != 0 && toAddress.Longitude != 0 && toAddress.Latitude != 0)
            {
                RouteDto route = new RouteDto();
                route.FromId = _addressLogic.GetAddressId(fromAddress);
                route.ToId = _addressLogic.GetAddressId(toAddress);
                route.Geometry = ride.RouteGeometry;
                route.AddressFrom = fromAddress;
                route.AddressTo = toAddress;

                int routeId = _routeLogic.GetRouteId(route.Geometry);
                if (routeId == -1)
                {
                    route.Geometry = ride.RouteGeometry;
                    _routeLogic.AddRoute(route);
                    ride.RouteId = _routeLogic.GetRouteId(route.Geometry);
                }
                else
                {
                    ride.RouteId = routeId;
                }
            }
        }

        public IEnumerable<RouteDto> GetRoutes(RouteDto routeDto, string email)
        {
            List<RouteDto> routes = _routeLogic.GetRoutes(routeDto, email);
            foreach (RouteDto route in routes)
            {
                AddDriversNamesToRouteRides(route.Rides);
            }
            return routes;

        }

        public List<RideDto> GetFinishedPassengerRides(string passengerEmail)
        {
            List<PassengerDto> passengers = _passengerLogic.GetUnrepondedPassengersByEmail(passengerEmail);

            //    IEnumerable<Ride> entityRides = _rideRepository.FindRidesByPassenger(_mapper.Map<PassengerDto,Passenger>(passengers));
            List<RideDto> dtoRides = new List<RideDto>();
            DateTime hourAfterRide = new DateTime();
            hourAfterRide = DateTime.Now;
            hourAfterRide.AddHours(1);
            foreach (PassengerDto passenger in passengers)
            {
                Ride ride = _rideRepository.GetRideById(passenger.RideId);
                if (ride != null)
                {
                    if (DateTime.Compare(ride.RideDateTime, hourAfterRide) < 0)
                    {

                        var user = _userLogic.GetUserByEmail(EmailType.LOGIN, ride.DriverEmail);
                        RideDto dtoRide = _mapper.Map<Ride, RideDto>(ride);
                        dtoRide.DriverFirstName = user.FirstName;
                        dtoRide.DriverLastName = user.LastName;
                        dtoRides.Add(dtoRide);
                    }
                }
            }
            return dtoRides;
        }

        public bool AddDriversNamesToRouteRides(List<RideDto> dtoRides)
        {
            List<string> emails = new List<string>();
            List<string> FirstNames = new List<string>();
            List<string> LastNames = new List<string>();
            List<string> phones = new List<string>();
            foreach (RideDto ride in dtoRides)
            {
                if (!emails.Contains(ride.DriverEmail))
                {
                    emails.Add(ride.DriverEmail);
                    var driver = _userLogic.GetUserByEmail(EmailType.LOGIN, ride.DriverEmail);
                    FirstNames.Add(driver.FirstName);
                    LastNames.Add(driver.LastName);
                    phones.Add(driver.Phone);
                    ride.DriverFirstName = driver.FirstName;
                    ride.DriverLastName = driver.LastName;
                    ride.DriverPhone = driver.Phone;
                }
                else
                {
                    int index = emails.IndexOf(ride.DriverEmail);
                    ride.DriverFirstName = FirstNames[index];
                    ride.DriverLastName = LastNames[index];
                    ride.DriverPhone = phones[index];
                }
            }
            return true;
        }

        public IEnumerable<RideDto> GetRidesByRoute(string routeGeometry)
        {
            IEnumerable<Ride> entityRides = _rideRepository.GetRidesByRoute(routeGeometry);

            List<RideDto> dtoRides = (List<RideDto>)MapToList(entityRides);

            AddDriversNamesToRouteRides(dtoRides);

            return dtoRides;
        }

        public void UpdateRide(RideDto ride)
        {
            _rideRepository.UpdateRide(_mapper.Map<RideDto, Ride>(ride));
        }

        public bool IsRideRequested(int rideId, string email)
        {
            return _rideRepository.IsRideRequested(rideId, email);
        }
    }
}