using ShareCar.Db;
using ShareCar.Db.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ShareCar.Logic.User_Logic
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public UserRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
        }
        public IEnumerable<Passenger> FindPassengersByEmail(string email)
        {
            return _databaseContext.Passengers.Where(x => x.Email == email);

        }
        public int CalculatePoints(string userEmail)
        {
            IEnumerable<Ride> Rides = _databaseContext.Rides.Where(x => x.DriverEmail == userEmail);

            int sum = 0;

            foreach(var ride in Rides)
            {
               foreach(var passenger in ride.Passengers)
                {
                    if (passenger.Completed)
                    {
                        sum++;
                    }
                }
            }

            return sum;
        }

        public bool CheckIfRegistered(string userEmail)
        {
            try
            {// Throws exception if user is not found
                return _databaseContext.User.Single(x => x.Email == userEmail) == null ? false : true; 
            }
            catch
            {
                return false;
            }
        }

        public void RegisterUser(User user)
        {
            _databaseContext.User.Add(user);
            _databaseContext.SaveChanges();
        }
    }
}
