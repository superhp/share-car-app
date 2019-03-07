using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories.Passenger_Repository
{
    public interface IPassengerRepository
    {
        int GetUsersPoints(string email);
        void AddNewPassenger(Passenger passenger);
        IEnumerable<Passenger> GetUnrepondedPassengersByEmail(string email);
        IEnumerable<Passenger> GetPassengersByRideId(int rideId);
        void RespondToRide(bool response, int rideId, string passengerEmail);
    }
}
