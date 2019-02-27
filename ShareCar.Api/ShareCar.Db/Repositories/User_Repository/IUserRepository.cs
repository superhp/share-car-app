using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using ShareCar.Dto;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Facebook;

namespace ShareCar.Db.Repositories.User_Repository
{
    public interface IUserRepository
    {
        Task CreateUser(User user);
        Task<UserDto> GetLoggedInUser(ClaimsPrincipal principal);
        Task<IdentityResult> UpdateUserAsync(User user, ClaimsPrincipal principal);
        IEnumerable<User> GetAllUsers();
        UnauthorizedUser GetUnauthorizedUser(string email);
        void CreateUnauthorizedUser(UnauthorizedUser user);
        bool UpdateUser(User user);
        //    bool SetUsersCognizantEmail(string cognizantEmail, string loginEmail);
        //    bool UserVerified(bool faceBookVerified, string loginEmail);
      //  User GetUsersByCognizantEmail(string cognizantEmail);
      //  User GetUsersByLoginEmail(string loginEmail);
        User GetUserByEmail(EmailType type, string email);
        void DeleteUser(string email);
    }
}