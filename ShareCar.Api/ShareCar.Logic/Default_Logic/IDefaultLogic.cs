using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Default_Logic
{
    public interface IDefaultLogic
    {
        IEnumerable<RequestDto> FindUsersRequests(bool driver, string email);
        bool UpdateRequest(RequestDto request);
        bool AddRequest(RequestDto request);
    }
}
