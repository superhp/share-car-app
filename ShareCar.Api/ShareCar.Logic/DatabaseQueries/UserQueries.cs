using ShareCar.Db;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace ShareCar.Logic.DatabaseQueries
{
    public class UserQueries : IUserQueries
    {
        private readonly ApplicationDbContext _databaseContext;

        public UserQueries(ApplicationDbContext context)
        {
            _databaseContext = context;
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
            return _databaseContext.People.Single(x => x.Email == userEmail) == null ? false : true;


        }

        public void RegisterUser(Person user)
        {
            _databaseContext.People.Add(user);
        }
    }
}
