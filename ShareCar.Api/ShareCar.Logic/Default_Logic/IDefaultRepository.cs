using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Default_Logic
{
    public interface IDefaultRepository
    {

        bool AddRequest(Request request);

        IEnumerable<Request> FindDriverRequests(string email);

        IEnumerable<Request> FindPassengerRequests(string email);

        bool UpdateRequest(Request request);

    }
}
