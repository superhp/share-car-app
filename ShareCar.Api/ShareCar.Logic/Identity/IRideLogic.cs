using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Dto.Identity;
namespace ShareCar.Logic.Identity
{
    public interface IRideLogic
    {
        RideDto FindRideByDriver(string email);
        RideDto FindRideById(int id);
        RideDto FindRideByDate(DateTime date);
        RideDto FindRideByDestination(AddressDto address);
        RideDto FindRideByStartPoint(AddressDto address);

    }
}
