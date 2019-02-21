using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories.Passenger_Repository
{
    public interface IPassengerRepository
    {
        int GetUsersPoints(string email);
        bool AddNewPassenger(Passenger passenger);
        IEnumerable<Passenger> GetUnrepondedPassengersByEmail(string email);
        IEnumerable<Passenger> GetPassengersByRideId(int rideId);
        bool RespondToRide(bool response, int rideId, string passengerEmail);
    }
}
