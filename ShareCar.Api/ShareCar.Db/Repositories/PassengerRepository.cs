using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories
{
    public class PassengerRepository : IPassengerRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public PassengerRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
        }

        public bool AddNewPassenger(Passenger passenger)
        {
            //     try
            //    {
            _databaseContext.Passengers.Add(passenger);
            _databaseContext.SaveChanges();
            return true;
            //   }
            //catch
            //    {
            //        return false;
            //    }

        }
    }
}
