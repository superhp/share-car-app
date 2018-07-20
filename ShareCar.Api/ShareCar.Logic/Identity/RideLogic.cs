using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Identity
{
    public class RideLogic : IRideLogic
    {

        public RideLogic()
        {

        }

        public RideDto FindRideByDate(DateTime date)
        {
            throw new NotImplementedException();
        }

        public RideDto FindRideByDestination(AddressDto address)
        {
            throw new NotImplementedException();
        }

        public RideDto FindRideByDriver(string email)
        {
            throw new NotImplementedException();
        }


        public RideDto FindRideById(int id)
        {
            throw new NotImplementedException();
        }

        public RideDto FindRideByStartPoint(AddressDto address)
        {
            throw new NotImplementedException();
        }
    }
}
