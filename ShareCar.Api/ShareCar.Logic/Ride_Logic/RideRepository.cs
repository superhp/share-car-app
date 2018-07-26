using ShareCar.Db;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using ShareCar.Logic.ObjectMapping;

namespace ShareCar.Logic.Ride_Logic
{
    public class RideRepository : IRideRepository
    {
        private readonly ApplicationDbContext _databaseContext;
        private readonly RideMapper _rideMapper;



        public RideRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
            _rideMapper = new RideMapper();
        }


        public void AddRide(Ride ride)
        {
            _databaseContext.Rides.Add(ride);
            _databaseContext.SaveChanges();
        }

        public IEnumerable<Ride> FindRidesByDate(DateTime date)
        {
                return _databaseContext.Rides.Where(x => x.RideDateTime == date);
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

        public IEnumerable<Ride> FindRidesByStartPoint(Address address)
        {

                return _databaseContext.Rides.Where(x => x.From == address);
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
