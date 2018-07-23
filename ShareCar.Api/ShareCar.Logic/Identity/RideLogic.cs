using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Logic.ObjectMapping;
using ShareCar.Logic.DatabaseQueries;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Identity
{
    public class RideLogic : IRideLogic
    {
        private readonly IRideQueries _rideDatabase;
        private RideMapper _rideMapper = new RideMapper();
        private AddressMapper _addressMapper = new AddressMapper();

        public RideDto FindRideById(int id)
        {
            Ride ride = _rideDatabase.FindRideById(id);

            if(ride == null)
            {
                return null;
            }

            return _rideMapper.MapToDto(ride);
        }

        public IEnumerable<RideDto> FindRidesByDate(DateTime date)
        {
            IEnumerable <Ride> Rides = _rideDatabase.FindRidesByDate(date);

            return MapToList(Rides);
        }

        public IEnumerable<RideDto> FindRidesByDriver(string email)
        {
            IEnumerable<Ride> Rides = _rideDatabase.FindRidesByDriver(email);
            return MapToList(Rides);
        }


        public IEnumerable<RideDto> FindRidesByStartPoint(AddressDto address)
        {
            Address EntityAddress = _addressMapper.MapToEntity(address);
            IEnumerable<Ride> Rides = _rideDatabase.FindRidesByStartPoint(EntityAddress);
            return MapToList(Rides);
        }

        public IEnumerable<RideDto> FindRidesByDestination(AddressDto address)
        {
            Address EntityAddress = _addressMapper.MapToEntity(address);
            IEnumerable<Ride> Rides = _rideDatabase.FindRidesByDestination(EntityAddress);
            return MapToList(Rides);
        }

        public bool UpdateRide(RideDto ride)
        {

            bool addNewRide = ValidateNewRide();

            if (addNewRide)
            {
                _rideDatabase.UpdateRide(_rideMapper.MapToEntity(ride));
                return true;
            }
            return false;
        }

        public bool AddRide(RideDto ride)
        {

            bool addNewRide = ValidateNewRide();

            if (addNewRide)
            {                
                _rideDatabase.AddRide(_rideMapper.MapToEntity(ride));
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
        private IEnumerable<RideDto> MapToList(IEnumerable<Ride> Rides)
        {
            if (Rides == null)
            {
                return null;
            }

            List<RideDto> DtoRides = new List<RideDto>();

            foreach (var ride in Rides)
            {
                DtoRides.Add(_rideMapper.MapToDto(ride));
            }
            return DtoRides;
        }
    }
}
