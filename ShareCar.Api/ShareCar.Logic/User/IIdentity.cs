using System.Threading.Tasks;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Person_Logic
{
    public interface IIdentity
    {
        Task<string> Login(AccessTokenDto facebookAccessToken);
    }
}