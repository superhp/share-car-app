﻿using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Dto.Identity;
using System.Threading.Tasks;
using System.Security.Claims;

namespace ShareCar.Logic.Ride_Logic
{
    public interface IRideLogic
    {
        IEnumerable<RideDto> FindRidesByDriver(string email);
        RideDto FindRideById(int id);
        Task<IEnumerable<RideDto>> FindRidesByDate(DateTime date, ClaimsPrincipal User);
        Task<IEnumerable<RideDto>> FindRidesByDestination(int address, ClaimsPrincipal User);
        IEnumerable<RideDto> FindRidesByStartPoint(int adressFromId);
        IEnumerable<PassengerDto> FindPassengersByRideId(int rideId);
        bool UpdateRide(RideDto ride);
        bool AddRide(RideDto ride);

    }
}
