using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Cognizant;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShareCar.Logic.User_Logic
{
    public interface IUserLogic
    {
        Task<UserDto> GetUserAsync(ClaimsPrincipal principal);
        Task UpdateUserAsync(UserDto updatedUser, ClaimsPrincipal User);
        int CountPoints(string email);
        Dictionary<UserDto, int> GetWinnerBoard();
        IEnumerable<UserDto> GetAllUsers();
        Task SubmitCognizantEmailAsync(CognizantData cogzniantData);
        string SubmitVerificationCode();
    }
}
