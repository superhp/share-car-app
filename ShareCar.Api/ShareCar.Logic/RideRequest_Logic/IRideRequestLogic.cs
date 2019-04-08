﻿using System.Collections.Generic;
using System.Threading.Tasks;
using ShareCar.Dto;


namespace ShareCar.Logic.RideRequest_Logic
{
    public interface IRideRequestLogic
    {
        IEnumerable<RideRequestDto> GetPassengerRequests(string email);
        void UpdateRequest(RideRequestDto request);
        void AddRequest(RideRequestDto request, string driverEmail);
        void SeenByPassenger(int[] requests);
        void SeenByDriver(int[] requests);
        void DeletedRide(int rideId);
        List<RideRequestDto> GetAcceptedRequests(string passengerEmail);
    }
}
