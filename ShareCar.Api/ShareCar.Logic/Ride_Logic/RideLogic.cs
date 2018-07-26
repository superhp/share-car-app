using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using ShareCar.Logic.ObjectMapping;
using ShareCar.Dto.Identity;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ShareCar.Logic.Ride_Logic
{
    public class RideLogic : IRideLogic
    {
        private readonly IRideRepository _rideRepository;
        private RideMapper _rideMapper = new RideMapper();
        private PassengerMapper _passengerMapper = new PassengerMapper();
        private AddressMapper _addressMapper = new AddressMapper();

        public RideLogic(IRideRepository rideRepository)
        {
            _rideRepository = rideRepository;
        }

        public RideDto FindRideById(int id)
        {
            Ride ride = _rideRepository.FindRideById(id);

            if(ride == null)
            {
                return null;
            }

            return _rideMapper.MapToDto(ride);
        }

        public async Task<IEnumerable<RideDto>> FindRidesByDate(DateTime date, ClaimsPrincipal User)
        {
            IEnumerable <Ride> rides = _rideQueries.FindRidesByDate(date, User);

            return MapToList(rides);
        }

        public IEnumerable<RideDto> FindRidesByDriver(string email)
        {
            IEnumerable<Ride> rides = _rideRepository.FindRidesByDriver(email);
            return MapToList(rides);
        }


        public IEnumerable<RideDto> FindRidesByStartPoint(int addressFromId)
        {
            IEnumerable<Ride> rides = _rideQueries.FindRidesByStartPoint(addressFromId);
            return MapToList(rides);
        }

        public IEnumerable<RideDto> FindRidesByDestination(AddressDto address)
        {
            Address EntityAddress = _addressMapper.MapToEntity(address);
            IEnumerable<Ride> rides = _rideRepository.FindRidesByDestination(EntityAddress);
            return MapToList(rides);
        }
        public IEnumerable<PassengerDto> FindPassengersByRideId(int id)
        {
            IEnumerable<Passenger> passengers = _rideRepository.FindPassengersByRideId(id);

            return MapToList(passengers);
        }
        public bool UpdateRide(RideDto ride)
        {

            //----WILL BE UNCOMMENTED ONCE VALIDATION APPEARS
            //  bool addNewRide = ValidateNewRide(); 

            bool addNewRide = true; // Will be deleted once validation appears

            if (addNewRide)
            {
               return _rideRepository.UpdateRide(_rideMapper.MapToEntity(ride));
               
            }
            return false;
        }   

        public bool AddRide(RideDto ride)
        {

            ride.Passengers = new List<PassengerDto>();
            ride.Requests = new List<RequestDto>();
            
            //----WILL BE UNCOMMENTED ONCE VALIDATION APPEARS
          //  bool addNewRide = ValidateNewRide(); 

         bool   addNewRide = true; // Will be deleted once validation appears

            if (addNewRide)
            {
                _rideRepository.AddRide(_rideMapper.MapToEntity(ride));
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
                DtoRides.Add(_rideMapper.MapToDto(ride));
            }
            return DtoRides;
        }
        private IEnumerable<PassengerDto> MapToList(IEnumerable<Passenger> passengers)
        {
            if (passengers == null)
            {
                return null;
            }

            List<PassengerDto> DtoPassengers = new List<PassengerDto>();

            foreach (var passenger in passengers)
            {
                DtoPassengers.Add(_passengerMapper.MapToDto(passenger));
            }
            return DtoPassengers;
        }
    }
}
