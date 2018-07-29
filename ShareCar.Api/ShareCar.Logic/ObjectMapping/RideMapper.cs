using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System.Collections.Generic;

namespace ShareCar.Logic.ObjectMapping
{
    class RideMapper
    {
        public Ride MapToEntity(RideDto ride)
        {
            PassengerMapper PassengerMapper = new PassengerMapper();
            RequestMapper RequestMapper = new RequestMapper();

            List<Passenger> EntityPassengers = new List<Passenger>();
            List<Request> EntityRequests = new List<Request>();

            
                foreach (var passenger in ride.Passengers)
                {
                    EntityPassengers.Add(PassengerMapper.MapToEntity(passenger));
                }
            
            
                foreach (var request in ride.Requests)
                {
                    EntityRequests.Add(RequestMapper.MapToEntity(request));
                }
            
            return new Ride
            {
                RideId = ride.RideId,
                FromId = ride.FromId,
                ToId = ride.ToId,
                DriverEmail = ride.DriverEmail,
                RideDateTime = ride.RideDateTime,
                Passengers = EntityPassengers

            };
        }

        public RideDto MapToDto(Ride ride)
        {
            PassengerMapper PassengerMapper = new PassengerMapper();
            RequestMapper RequestMapper = new RequestMapper();

            List<PassengerDto> DtoPassengers = new List<PassengerDto>();
            List<RequestDto> DtoRequests = new List<RequestDto>();

            try
            {
                foreach (var passenger in ride.Passengers)
                {
                    DtoPassengers.Add(PassengerMapper.MapToDto(passenger));
                }

                

                return new RideDto
                {
                    RideId = ride.RideId,
                    FromId = ride.FromId,
                    ToId = ride.ToId,
                    DriverEmail = ride.DriverEmail,
                    RideDateTime = ride.RideDateTime,
                    Passengers = DtoPassengers,
                    Requests = DtoRequests

                };
             }
                catch (System.NullReferenceException)
                {
                return new RideDto
                {
                    RideId = ride.RideId,
                    FromId = ride.FromId,
                    ToId = ride.ToId,
                    DriverEmail = ride.DriverEmail,
                    RideDateTime = ride.RideDateTime,
                    Passengers = null,
                    Requests = null

                };
            }
        }

        public void MapEntityToEntity(Ride target, Ride example)
        {

            target.RideId = example.RideId;
            target.FromId = example.FromId;
            target.ToId = example.ToId;
            target.DriverEmail = example.DriverEmail;
            target.RideDateTime = example.RideDateTime;
            target.Passengers = example.Passengers;

        }

    }
}
