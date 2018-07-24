using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Logic.DatabaseQueries;
using ShareCar.Logic.ObjectMapping;



namespace ShareCar.Logic.Identity
{
    class PassengerLogic : IPassengerLogic
    {
        private readonly IPassengerQueries _passengerQueries;
        private PassengerMapper _passengerMapper = new PassengerMapper();

        public IEnumerable<PassengerDto> FindPassengersByEmail(string email)
        {
            IEnumerable<Passenger> Passengers = _passengerQueries.FindPassengersByEmail(email);

            return MapToList(Passengers);
        }
        public IEnumerable<PassengerDto> FindPassengersByRideId(int id)
        {
            IEnumerable<Passenger> Passengers = _passengerQueries.FindPassengersByRideId(id);

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
