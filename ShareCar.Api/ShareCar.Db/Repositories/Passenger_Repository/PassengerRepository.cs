using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace ShareCar.Db.Repositories.Passenger_Repository
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

        public void AddNewPassenger(Passenger passenger)
        {
                var p = _databaseContext.Passengers.FirstOrDefault(x => x.Email == passenger.Email && x.RideId == passenger.RideId);

                if(p != null)
                {
                throw new ArgumentException("Passenger has already registered to ride.");
                }

                _databaseContext.Passengers.Add(passenger);
                _databaseContext.SaveChanges();

        }

        public IEnumerable<Passenger> GetUnrepondedPassengersByEmail(string email)
        {
                return _databaseContext.Passengers.Where(x => x.Email == email && x.PassengerResponded == false);

        }

        public IEnumerable<Passenger> GetPassengersByDriver(string email)
        {
            return _databaseContext.Passengers.Where(x => x.Ride.DriverEmail == email);
        }

        public void RespondToRide(bool response, int rideId, string passengerEmail)
        {
                Passenger passenger = _databaseContext.Passengers.Single(x => x.RideId == rideId && x.Email == passengerEmail);
                passenger.PassengerResponded = true;
                passenger.Completed = response;
                _databaseContext.SaveChanges();

            }

        public void RemovePassenger(string email, int rideId)
        {
            Passenger passenger = _databaseContext.Passengers.Single(x => x.RideId == rideId && x.Email == email);
            _databaseContext.Remove(passenger);
        }
    }
}