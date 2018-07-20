using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;

namespace ShareCar.Db.DatabaseQueries
{
    public class RideDatabaseQueries : IRideDatabase
    {

        public Ride FindRideByDate(DateTime date)
        {
            throw new NotImplementedException();
        }

        public Ride FindRideByDestination(Address address)
        {
            throw new NotImplementedException();
        }

        public Ride FindRideById(int id)
        {
            throw new NotImplementedException();
        }

        public Ride FindRideByStartPoint(Address address)
        {
            throw new NotImplementedException();
        }
    }
}
