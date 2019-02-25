using System.Threading.Tasks;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Facebook;

namespace ShareCar.Logic.Identity_Logic
{
    public interface IFacebookIdentity
    {
        Task<LoginResponseModel> Login(AccessTokenDto accessToken);
    }
}