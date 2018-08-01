using System.Threading.Tasks;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.User_Logic
{
    public interface IIdentity
    {
        Task<string> Login(AccessTokenDto facebookAccessToken);
    }
}