using ShareCar.Dto;
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
        UnauthorizedUserDto GetUnauthorizedUser(string email);
        Task CreateUser(UserDto userDto);
        void CreateUnauthorizedUser(UnauthorizedUserDto user);
        bool SetUsersCognizantEmail(CognizantData data);
        bool VerifyUser(bool faceBookVerified, string loginEmail); 
        UserDto GetUserByEmail(EmailType type, string email);
        bool DoesUserExist(EmailType type, string cognizantEmail);
        void DeleteUnusedUsers();
    }
}
