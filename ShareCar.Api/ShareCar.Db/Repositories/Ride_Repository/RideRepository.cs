using ShareCar.Db;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using ShareCar.Db.Repositories;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using ShareCar.Db.Repositories.User_Repository;

namespace ShareCar.Db.Repositories.Ride_Repository
{
    public class RideRepository : IRideRepository
    {

        private readonly ApplicationDbContext _databaseContext;
        
        public RideRepository(ApplicationDbContext context, IUserRepository userRepository)
        {
            _databaseContext = context;
        }


        public bool AddRide(Ride ride)
        {
            try
            {
                ride.isActive = true;
                _databaseContext.Rides.Add(ride);

                _databaseContext.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
            }

        public IEnumerable<Ride> GetRidesByDate(DateTime date)
        {
            return _databaseContext.Rides
                    .Where(x => x.RideDateTime == date && x.isActive == true);
        }

        public IEnumerable<Ride> GetRidesByDestination(int addressToId)
        {
            return _databaseContext.Rides
                .Where(x => x.Route.ToId == addressToId && x.isActive == true);
        }

        public Ride GetRideById(int id)
        {
            try
            {
                return _databaseContext.Rides.Single(x => x.RideId == id && x.isActive == true); 
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<Ride> GetRidesByStartPoint(int addressFromId)
        {
            return _databaseContext.Rides
                .Where(x => x.Route.FromId == addressFromId && x.isActive == true);
        }
        public IEnumerable<Passenger> GetPassengersByRideId(int id)
        {
            return _databaseContext.Passengers.Where(x => x.RideId == id);
        }
        
        public IEnumerable<Ride> GetRidesByPassenger(Passenger passenger)
        {
            return _databaseContext.Rides.Where(x => x.Passengers.Contains(passenger) && x.isActive == true);
        }

        public bool UpdateRide(Ride ride)
        {
            try
            {
                var rideToUpdate = _databaseContext.Rides.Where(x => x.RideId == ride.RideId).Single();
                rideToUpdate.RouteId = ride.RouteId;
                rideToUpdate.RideDateTime = ride.RideDateTime;
                rideToUpdate.isActive = true;
                rideToUpdate.NumberOfSeats = ride.NumberOfSeats;
                
                _databaseContext.Rides.Update(rideToUpdate);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public bool SetRideAsInactive(Ride ride)
        {
            try
            {
                var rideToDelete = _databaseContext.Rides.Include(x => x.Requests).Single(x => x.RideId == ride.RideId);
                rideToDelete.isActive = false;
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public IEnumerable<Ride> GetSimmilarRides(string driverEmail, int routeId, int rideId)
        {
            return _databaseContext.Rides.Where(x => x.DriverEmail == driverEmail && x.RouteId == routeId && x.RideId != rideId && x.isActive == true);
        }

        public IEnumerable<Ride> GetRidesByDriver(string email)
        {
            return _databaseContext.Rides
                .Include(x=>x.Requests)
                .Include(x=>x.Passengers)
                .Where(x => x.DriverEmail == email && x.isActive == true);
        }

        public IEnumerable<Ride> GetRidesByRoute(string routeGeometry)
        {
            return _databaseContext.Rides.Where(x => x.Route.Geometry == routeGeometry && x.isActive == true);
        }
    }
}
    
