using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace ShareCar.Db.Repositories
{
    public class PassengerRepository : IPassengerRepository
    {
        private readonly ApplicationDbContext _databaseContext;
        public PassengerRepository(ApplicationDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public int GetUsersPoints(string email)
        {
            int points = _databaseContext.Passengers
                .Join(_databaseContext.Rides.Where(x => ((x.RideDateTime.Month == DateTime.Now.Month) && (x.DriverEmail == email))),
                x => x.RideId,
                y => y.RideId,
                (x, y) => x).Where(z => z.Completed == true).Count();
            return points;
        }

        public bool AddNewPassenger(Passenger passenger)
        {
            _databaseContext.Passengers.Add(passenger);
            _databaseContext.SaveChanges();
            return true;
        }

        public void RemovePassenger(Passenger passenger)
        {
            _databaseContext.Passengers.Remove(passenger);
            _databaseContext.SaveChanges();

        }
        public IEnumerable<Passenger> GetUnrepondedPassengersByEmail(string email)
        {
                return _databaseContext.Passengers.Where(x => x.Email == email && x.PassengerResponded == false);

        }

        public IEnumerable<Passenger> GetPassengersByRideId(int rideId)
        {
            return _databaseContext.Passengers.Where(x => x.RideId == rideId);
        }

        public void RespondeToRide(bool response, int rideId, string passengerEmail)
        {
            try
            {
                Passenger passenger = _databaseContext.Passengers.Single(x => x.RideId == rideId && x.Email == passengerEmail);
                passenger.PassengerResponded = true;
                passenger.Completed = response;
                _databaseContext.SaveChanges();
            }
            catch(Exception e)
            {

            }
        }
    }
}