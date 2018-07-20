using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.DatabaseQueries
{
   public interface IRideDatabase
    {
        Ride FindRideById(int id);
        Ride FindRideByDate(DateTime date);
        Ride FindRideByDestination(Address address);
        Ride FindRideByStartPoint(Address address);

    }
}
