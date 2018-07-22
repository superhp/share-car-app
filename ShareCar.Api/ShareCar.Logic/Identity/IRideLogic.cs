using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Identity
{
    public interface IRideLogic
    {
        IEnumerable<RideDto> FindRidesByDriver(string email);
        RideDto FindRideById(int id);
        IEnumerable<RideDto> FindRidesByDate(DateTime date);
        IEnumerable<RideDto> FindRidesByDestination(AddressDto address);
        IEnumerable<RideDto> FindRidesByStartPoint(AddressDto address);
        bool UpdateRide(RideDto ride);
        bool AddRide(RideDto ride);

    }
}
