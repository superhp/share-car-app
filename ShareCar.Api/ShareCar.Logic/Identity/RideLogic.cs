using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.DatabaseQueries;
namespace ShareCar.Logic.Identity
{
    public class RideLogic : IRideLogic
    {
        private readonly IRideDatabase _rideDatabase;

        public RideLogic()
        {

        }

        public RideDto FindRideById(int id)
        {
            Ride ride = _rideDatabase.FindRideById(id);

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


        public RideDto FindRideByStartPoint(AddressDto address)
        {
            throw new NotImplementedException();
        }

        private RideDto MapToDto(Ride ride)
        {
            throw new NotImplementedException();
        }

    }
}
