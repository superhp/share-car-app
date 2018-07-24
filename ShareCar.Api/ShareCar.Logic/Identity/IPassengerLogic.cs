using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Identity
{
    public interface IPassengerLogic
    {
        IEnumerable<PassengerDto> FindPassengersByEmail (string email);
        IEnumerable<PassengerDto> FindPassengersByRideId (int rideId);

    }
}
