﻿using ShareCar.Db;
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


        public Ride AddRide(Ride ride)
        {
                ride.isActive = true;
               var entity = _databaseContext.Rides.Add(ride).Entity;

                _databaseContext.SaveChanges();
            return entity;
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
                return _databaseContext.Rides.SingleOrDefault(x => x.RideId == id && x.isActive == true); 
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

        public void UpdateRide(Ride ride)
        {
                var rideToUpdate = _databaseContext.Rides.Find(ride.RideId); 
                rideToUpdate.RouteId = ride.RouteId;
                rideToUpdate.RideDateTime = ride.RideDateTime;
                rideToUpdate.isActive = true;
                rideToUpdate.NumberOfSeats = ride.NumberOfSeats;
                
                _databaseContext.Rides.Update(rideToUpdate);
                _databaseContext.SaveChanges();
        }
        public void SetRideAsInactive(Ride ride)
        {
                var rideToDelete = _databaseContext.Rides.Include(x => x.Requests).Single(x => x.RideId == ride.RideId);

                rideToDelete.isActive = false;
                _databaseContext.SaveChanges();
        }

        public IEnumerable<Ride> GetSimmilarRides(string driverEmail, int routeId, int rideId)
        {
            return _databaseContext.Rides.Where(x => x.DriverEmail == driverEmail && x.RouteId == routeId && x.RideId != rideId && x.isActive == true);
        }

        public IEnumerable<Ride> GetRidesByDriver(string email)
        {
            return _databaseContext.Rides
                .Include(x=>x.Requests)
                .Include(x => x.Passengers)
                .Include(x => x.Route)
                .Where(x => x.DriverEmail == email && x.isActive == true);
        }

        public IEnumerable<Ride> GetRidesByRoute(string routeGeometry)
        {
            return _databaseContext.Rides.Where(x => x.Route.Geometry == routeGeometry && x.isActive == true);
        }

        public bool IsRideRequested(int rideId, string passengerEmail)
        {
            var ride = _databaseContext.Rides.Include(x => x.Requests).Single(x => x.RideId == rideId);
            if(ride.Requests.Where(x => x.PassengerEmail == passengerEmail && (x.Status == Status.ACCEPTED || x.Status == Status.WAITING)).Count() > 0)
            {
                return true;
            }
            return false;
        }
    }
}
    
