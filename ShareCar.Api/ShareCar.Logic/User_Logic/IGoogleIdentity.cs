using ShareCar.Dto.Identity.Google;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Logic.User_Logic
{
    public interface IGoogleIdentity
    {
        Task<string> Login(GoogleUserDataDto googleData);

    }
}
