using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using ShareCar.Logic.ObjectMapping;
using ShareCar.Dto.Identity;
using System.Threading.Tasks;
using System.Security.Claims;
using ShareCar.Logic.Address_Logic;

namespace ShareCar.Logic.Ride_Logic
{
    public class RideLogic : IRideLogic
    {
        private readonly IRideRepository _rideRepository;
        private readonly IAddressLogic _addressLogic;
        private RideMapper _rideMapper = new RideMapper();
        private PassengerMapper _passengerMapper = new PassengerMapper();
        private AddressMapper _addressMapper = new AddressMapper();

        public RideLogic(IRideRepository rideRepository, IAddressLogic addressLogic)
        {
            _rideRepository = rideRepository;
            _addressLogic = addressLogic;
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
            IEnumerable <Ride> rides = await _rideRepository.FindRidesByDate(date, User);


            return MapToList(rides);
        }

        public IEnumerable<RideDto> FindRidesByDriver(string email)
        {
            IEnumerable<Ride> rides = _rideRepository.FindRidesByDriver(email);


            List<RideDto> dtoRide = new List<RideDto>();
            int count = 0;
            foreach (var ride in rides)
            {
                dtoRide.Add(_rideMapper.MapToDto(ride));
                AddressDto fromAddress = _addressLogic.FindAddressById(ride.FromId);
                dtoRide[count].FromCountry = fromAddress.Country;
                dtoRide[count].FromCity = fromAddress.City;
                dtoRide[count].FromStreet = fromAddress.Street;
                dtoRide[count].FromNumber = fromAddress.Number;
                AddressDto toAddress = _addressLogic.FindAddressById(ride.ToId);
                dtoRide[count].ToCountry = toAddress.Country;
                dtoRide[count].ToCity = toAddress.City;
                dtoRide[count].ToStreet = toAddress.Street;
                dtoRide[count].ToNumber = toAddress.Number;
                count++;
            }
            return dtoRide;
        }


        public async Task<IEnumerable<RideDto>> FindRidesByStartPoint(int addressFromId, ClaimsPrincipal User)
        {
            IEnumerable<Ride> rides = await _rideRepository.FindRidesByStartPoint(addressFromId, User);
            return MapToList(rides);
        }

        public async Task<IEnumerable<RideDto>> FindRidesByDestination(int addressToId, ClaimsPrincipal User)
        {
            IEnumerable<Ride> rides = await _rideRepository.FindRidesByDestination(addressToId, User);
            return MapToList(rides);
        }
        public async Task<IEnumerable<PassengerDto>> FindPassengersByRideId(int id, ClaimsPrincipal User)
        {
            IEnumerable<Passenger> passengers = await _rideRepository.FindPassengersByRideId(id, User);

            return MapToList(passengers);
        }

        public async Task<IEnumerable<PassengerDto>> FindRidesByPassenger(ClaimsPrincipal User)
        {
            IEnumerable<Passenger> rides = await _rideRepository.FindRidesByPassenger(User);

            return MapToList(rides);
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
            List<PassengerDto> DtoPassengers = new List<PassengerDto>();

            foreach (var passenger in passengers)
            {
                DtoPassengers.Add(_passengerMapper.MapToDto(passenger));
            }
            return DtoPassengers;
        }
        

    }
}
