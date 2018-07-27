using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.ObjectMapping
{
    class PassengerMapper
    {
        public Passenger MapToEntity(PassengerDto passenger)
        {
            return new Passenger
            {
                RideId = passenger.RideId,
                Email = passenger.Email,
                Completed = passenger.Completed
            };
        }

        public PassengerDto MapToDto(Passenger passenger)
        {
            return new PassengerDto
            {
                RideId = passenger.RideId,
                Email = passenger.Email,
                Completed = passenger.Completed
            };
            
        }
    }
}
