using ShareCar.Dto.Identity.Cognizant;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Logic.Identity_Logic
{
    public interface ICognizantIdentity
    {
        Task SubmitCognizantEmailAsync(CognizantData data);
        bool SubmitVerificationCode(VerificationCodeSubmitData data);
    }
}
