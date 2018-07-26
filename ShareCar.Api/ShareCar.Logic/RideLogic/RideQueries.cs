using ShareCar.Db;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using ShareCar.Logic.ObjectMapping;
using ShareCar.Db.Repositories;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ShareCar.Logic.DatabaseQueries
{
    public class RideQueries : IRideQueries
    {
        private readonly ApplicationDbContext _databaseContext;
        private readonly RideMapper _rideMapper;
        private readonly IUserRepository _userRepository;



        public RideQueries(ApplicationDbContext context, IUserRepository userRepository)
        {
            _databaseContext = context;
            _rideMapper = new RideMapper();
            _userRepository = userRepository;
        }


        public void AddRide(Ride ride)
        {
            _databaseContext.Rides.Add(ride);
            _databaseContext.SaveChanges();
        }

        public async Task<IEnumerable<Ride>> FindRidesByDate(DateTime date, ClaimsPrincipal User)
        {
            var userDto = await _userRepository.GetLoggedInUser(User);
            return _databaseContext.Rides
                    .Where(y => y.DriverEmail == userDto.Email)
                    .Where(x => x.RideDateTime == date);
        }

        public IEnumerable<Ride> FindRidesByDestination(Address address)
        {
                return _databaseContext.Rides.Where(x => x.To == address);
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
                return _databaseContext.Rides.Where(x => x.FromId == addressFromId);
        }
        public IEnumerable<Passenger> FindPassengersByRideId(int id)
        {
            return _databaseContext.Passengers.Where(x => x.RideId == id);
        }
        public bool UpdateRide(Ride ride)
        {
            try
            {
                Ride toUpdate = _databaseContext.Rides.Single(x => x.RideId == ride.RideId);
                _rideMapper.MapEntityToEntity(toUpdate, ride);
                _databaseContext.SaveChanges();
                return true;
            }
            catch
            {
                 return false;
            }
        }

        public IEnumerable<Ride> FindRidesByDriver(string email)
        {
                return _databaseContext.Rides.Where(x => x.DriverEmail == email);         
        }
    }
}
