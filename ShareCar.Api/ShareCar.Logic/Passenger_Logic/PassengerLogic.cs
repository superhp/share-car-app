using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using ShareCar.Dto;
using ShareCar.Logic.Address_Logic;
using AutoMapper;
using System.Linq;
using ShareCar.Db.Repositories;
using System.Threading.Tasks;
using ShareCar.Logic.Route_Logic;
using ShareCar.Logic.Ride_Logic;
using ShareCar.Db.Repositories.Passenger_Repository;

namespace ShareCar.Logic.Passenger_Logic
{
    public class PassengerLogic : IPassengerLogic
    {

        private readonly IPassengerRepository _passengerRepository;
        private readonly IMapper _mapper;

        public PassengerLogic(IMapper mapper, IPassengerRepository passengerRepository)
        {
            _mapper = mapper;
            _passengerRepository = passengerRepository;
        }

        public void AddPassenger(PassengerDto passenger)
        {

            _passengerRepository.AddNewPassenger(_mapper.Map<PassengerDto, Passenger>(passenger));

        }

        public List<PassengerDto> GetUnrepondedPassengersByEmail(string email)
        {
            IEnumerable<Passenger> passengers = _passengerRepository.GetUnrepondedPassengersByEmail(email);
            List<PassengerDto> dtoPassengers = new List<PassengerDto>();
            foreach (Passenger passenger in passengers)
            {
                dtoPassengers.Add(_mapper.Map<Passenger, PassengerDto>(passenger));
            }
            return dtoPassengers;
        }

        public List<PassengerDto> GetPassengersByDriver(string email)
        {
            IEnumerable<Passenger> passengers = _passengerRepository.GetPassengersByDriver(email);
            List<PassengerDto> dtoPassengers = new List<PassengerDto>();
            foreach (Passenger passenger in passengers)
            {
                passenger.Ride.Requests = passenger.Ride.Requests.Where(x => x.PassengerEmail == passenger.Email && x.Status == Db.Entities.Status.ACCEPTED).ToList();
                dtoPassengers.Add(_mapper.Map<Passenger, PassengerDto>(passenger));
            }
            return dtoPassengers;
        }
        public void RespondToRide(bool response, int rideId, string passengerEmail)
        {
            _passengerRepository.RespondToRide(response, rideId, passengerEmail);

        }
        public int GetUsersPoints(string email)
        {
            int points = _passengerRepository.GetUsersPoints(email);
            return points;
        }

        public void RemovePassenger(string email, int rideId)
        {
            _passengerRepository.RemovePassenger(email, rideId);
        }
    }
}
