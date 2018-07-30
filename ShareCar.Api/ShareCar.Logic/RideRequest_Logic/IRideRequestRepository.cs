﻿using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.RideRequest_Logic
{
    public interface IRideRequestRepository
    {

        bool AddRequest(Request request);
        Request FindRequestById(int id);
        IEnumerable<Request> FindPassengerRequests(string email);
        IEnumerable<Request> FindDriverRequests(string email);
        bool UpdateRequest(Request request);

    }
}
