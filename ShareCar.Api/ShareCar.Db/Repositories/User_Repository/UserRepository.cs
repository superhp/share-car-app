using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db.Entities;
using ShareCar.Dto;
using ShareCar.Dto.Identity;
using ShareCar.Dto.Identity.Facebook;

namespace ShareCar.Db.Repositories.User_Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _databaseContext;

        public UserRepository(UserManager<User> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _databaseContext = context;
        }

        public void CreateUnauthorizedUser(UnauthorizedUser user)
        {
            Random random = new Random();
            user.VerificationCode = random.Next();
            var result = _databaseContext.UnauthorizedUsers.Add(user);
            _databaseContext.SaveChanges();
        }

        public async Task CreateUser(User user)
        {

            var isFacebook = user.FacebookEmail != null;

            user.UserName = user.Email;
            user.CreationDate = DateTime.Now;
            var result = await _userManager.CreateAsync(user, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

            if (!result.Succeeded)
                throw new ArgumentException("Failed to create local user account.");

        }

        public IEnumerable<User> GetAllUsers()
        {
            return _databaseContext.Users;
        }

        public async Task<UserDto> GetLoggedInUser(ClaimsPrincipal principal)
        {
            var user = await _userManager.GetUserAsync(principal);
            var userDto = new UserDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PictureUrl = user.PictureUrl,
                Phone = user.Phone,
                LicensePlate = user.LicensePlate,
            };

            return userDto;
        }

        public async Task<IdentityResult> UpdateUserAsync(User user, ClaimsPrincipal principal)
        {
            var _user = await _userManager.GetUserAsync(principal);
            _user.FirstName = user.FirstName;
            _user.LastName = user.LastName;
            _user.Phone = user.Phone;
            _user.LicensePlate = user.LicensePlate;
            var userAsync = await _userManager.UpdateAsync(_user);
            return userAsync;
        }

        public UnauthorizedUser GetUnauthorizedUser(string email)
        {
            try
            {
                return _databaseContext.UnauthorizedUsers.Single(x => x.Email == email);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public bool UserVerified(bool faceBookVerified, string loginEmail)
        {
            try
            {
                var user = _databaseContext.User.Single(x => x.Email == loginEmail);
                if (faceBookVerified)
                {
                    user.FacebookVerified = true;
                }
                else
                {
                    user.GoogleVerified = true;
                }
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool UpdateUser(User user)
        {
            try
            {
                var toUpdate = _databaseContext.User.Single(x => x.Email == user.Email);

                toUpdate.FacebookEmail = user.FacebookEmail;
                toUpdate.GoogleEmail = user.GoogleEmail;
                toUpdate.FacebookVerified = user.FacebookVerified;
                toUpdate.GoogleVerified = user.GoogleVerified;
                toUpdate.CognizantEmail = user.CognizantEmail;
                _databaseContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public User GetUserByEmail(EmailType type, string email)
        {
            if (type == EmailType.COGNIZANT)
            {
                return _databaseContext.User.FirstOrDefault(x => x.CognizantEmail == email);
            }
            if (type == EmailType.FACEBOOK)
            {
                return _databaseContext.User.FirstOrDefault(x => x.FacebookEmail == email);
            }
            if (type == EmailType.GOOGLE)
            {
                return _databaseContext.User.FirstOrDefault(x => x.GoogleEmail == email);
            }
            if (type == EmailType.LOGIN)
            {
                return _databaseContext.User.FirstOrDefault(x => x.Email == email);
            }
            return null;
        }

        public void DeleteUnusedUsers(DateTime date)
        {
            var users = _databaseContext.Users.Where(x => !x.GoogleVerified && !x.FacebookVerified && x.CreationDate.Ticks <= date.Ticks).ToList();

            foreach(var user in users)
            {
                var unauthorizedUser = _databaseContext.UnauthorizedUsers.Single(x => x.Email == user.Email);
                _databaseContext.UnauthorizedUsers.Remove(unauthorizedUser);
                _databaseContext.SaveChanges();

                _databaseContext.Users.Remove(user);
                _databaseContext.SaveChanges();
            }

        }

        public void DeleteUnusedUnauthorizedUsers()
        {
            var users = _databaseContext.UnauthorizedUsers
                 .Join(_databaseContext.User.Where(x => (x.FacebookVerified || x.GoogleVerified)),
                 x => x.Email,
                 y => y.Email,
                 (x, y) => x);

            foreach (var user in users)
            {
                _databaseContext.UnauthorizedUsers.Remove(user);
                _databaseContext.SaveChanges();
            }
        }
    }
}