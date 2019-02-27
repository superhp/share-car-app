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
        //temporaryLoginEmail => email of acc which has FK to UnauthorizedUser
        // originalLoginEMail => email of acc which will be used in application
        bool VerifyUser(bool faceBookVerified, string temporaryLoginEmail); 
        UserDto GetUserByEmail(EmailType type, string email);
    }
}
