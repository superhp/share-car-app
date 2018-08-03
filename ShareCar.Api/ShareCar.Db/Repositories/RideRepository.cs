using ShareCar.Db;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using ShareCar.Db.Repositories;
using System.Threading.Tasks;
using System.Security.Claims;

namespace ShareCar.Db.Repositories
{
    public class RideRepository : IRideRepository
    {

        private readonly ApplicationDbContext _databaseContext;
        private readonly IUserRepository _userRepository;



        public RideRepository(ApplicationDbContext context, IUserRepository userRepository)
        {
            _databaseContext = context;
            _userRepository = userRepository;
        }


        public void AddRide(Ride ride)
        {
            _databaseContext.Rides.Add(ride);
            _databaseContext.SaveChanges();
        }

        public IEnumerable<Ride> FindRidesByDate(DateTime date)
        {
            return _databaseContext.Rides
                    .Where(x => x.RideDateTime == date);
        }

        public IEnumerable<Ride> FindRidesByDestination(int addressToId)
        {
            return _databaseContext.Rides
                .Where(x => x.Route.ToId == addressToId);
        }

        public Ride FindRideById(int id)
        {
            try
            {
                return _databaseContext.Rides.Single(x => x.RideId == id); // Throws exception if ride is not found
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<Ride> FindRidesByStartPoint(int addressFromId)
        {
            return _databaseContext.Rides
                .Where(x => x.Route.FromId == addressFromId);
        }
        public IEnumerable<Passenger> FindPassengersByRideId(int id)
        {
            return _databaseContext.Passengers.Where(x => x.RideId == id);
        }
        /*
        public async Task<IEnumerable<Passenger>> FindRidesByPassenger(ClaimsPrincipal User)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            return _databaseContext.Passengers.Where(x => x.Email == userDto.Email);
        }*/

        public bool UpdateRide(Ride ride)
        {
            try
            {
                //Ride toUpdate = _databaseContext.Rides.Single(x => x.RideId == ride.RideId);
                _databaseContext.Rides.Update(ride);
                _databaseContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public IEnumerable<Ride> FindSimmilarRides(string driverEmail, int routeId, int rideId)
        {
            return _databaseContext.Rides.Where(x => x.DriverEmail == driverEmail && x.RouteId == routeId && x.RideId != rideId);
        }

        public IEnumerable<Ride> FindRidesByDriver(string email)
        {
            return _databaseContext.Rides.Where(x => x.DriverEmail == email);
        }


    }
}
    
