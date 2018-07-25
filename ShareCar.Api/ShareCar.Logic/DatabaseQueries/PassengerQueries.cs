using ShareCar.Db;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShareCar.Logic.DatabaseQueries
{
    class PassengerQueries
    {
        private readonly ApplicationDbContext _databaseContext;
        public PassengerQueries(ApplicationDbContext context)
        {
            _databaseContext = context;
        }
        public IEnumerable<Passenger> FindPassengersByEmail(string email)
        {
            return _databaseContext.Passengers.Where(x => x.Email == email);

        }
        public IEnumerable<Passenger> FindPassengersByRideId(int id)
        {
            
            return _databaseContext.Passengers.Where(x => x.RideId == id);
        }
    }
}
