using ShareCar.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Passenger_Logic
{
    public interface IPassengerLogic
    {
        bool AddPassenger(PassengerDto passenger);
        int GetUsersPoints(string email);
        List<PassengerDto> GetPassengersByEmail(string email);
        void RespondToRide(bool response, int rideId, string passengerEmail);
    }
}
