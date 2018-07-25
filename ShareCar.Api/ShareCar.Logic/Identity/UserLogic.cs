using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using ShareCar.Db;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Logic.DatabaseQueries;
using ShareCar.Logic.Identity;
using ShareCar.Logic.ObjectMapping;

namespace ShareCar.Logic.Identity
{
    public class UserLogic : IUserLogic
    {
        private readonly ApplicationDbContext _databaseContext;
        private readonly IUserQueries _userQueries;
        private readonly PassengerMapper _passengerMapper = new PassengerMapper();
        private readonly UserMapper _userMapper = new UserMapper();

        public UserLogic(ApplicationDbContext context)
        {
            _databaseContext = context;
        }

        public bool CheckIfRegistered(IdentityUser<string> user)
        {
            return _userQueries.CheckIfRegistered(user.Email);
        }

        public void RegisterUser(IdentityUser<string> user)
        {
            _userQueries.RegisterUser(_userMapper.MapIdentityUserToPerson(user));
        }

        public int CalculatePoints(IdentityUser<string> user)
        {
            return _userQueries.CalculatePoints(_userMapper.MapIdentityUserToPerson(user).Email);
        }
        

        public IEnumerable<PassengerDto> FindPassengersByEmail(string email)
        {
            IEnumerable<Passenger> Passengers = _userQueries.FindPassengersByEmail(email);

            return MapToList(Passengers);
        }
        private IEnumerable<PassengerDto> MapToList(IEnumerable<Passenger> Passengers)
        {
            if (Passengers == null)
            {
                return null;
            }

            List<PassengerDto> DtoPassengers = new List<PassengerDto>();

            foreach (var passenger in Passengers)
            {
                DtoPassengers.Add(_passengerMapper.MapToDto(passenger));
            }
            return DtoPassengers;
        }
    }
}
