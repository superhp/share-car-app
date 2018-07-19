using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Dto.Identity;
namespace ShareCar.Logic.Identity
{
    public interface IRide
    {
        bool FindRideByDriver(string email);
        bool FindRideById(int id);
        bool FindRideByDate(DateTime date);
        bool FindRideByDestination(AddressDto address);
        bool FindRideByStartPoint(AddressDto address);

    }
}
