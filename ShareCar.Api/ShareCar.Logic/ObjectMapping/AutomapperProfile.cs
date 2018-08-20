using AutoMapper;
using ShareCar.Dto;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.ObjectMapping
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Ride, RideDto>();
            CreateMap<RideDto, Ride>();
            CreateMap<RideRequest, RideRequestDto>();
            CreateMap<RideRequestDto, RideRequest>();
            CreateMap<Passenger, PassengerDto>();
            CreateMap<PassengerDto, Passenger>();
            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto, Address>();
            CreateMap<UserDto, User>();
            //.ForMember(src => src.Title, dest => dest.MapFrom(x => x.VeryDifferentTitle));
            /*      CreateMap<Status, TodoItemStatus>()
                     .ProjectUsing(src => (TodoItemStatus)src);
                  CreateMap<TodoItemStatus, Status>()
                      .ProjectUsing(src => (Status)src);*/
        }
    }
}
