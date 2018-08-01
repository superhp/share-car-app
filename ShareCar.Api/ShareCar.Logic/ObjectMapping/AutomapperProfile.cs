using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using ShareCar.Dto;
using ShareCar.Db.Entities;
namespace ShareCar.Logic.ObjectMapping
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Ride, RideDto>();
            CreateMap<RideDto, Ride>();
            CreateMap<Request, RideRequestDto>();
            CreateMap<RideRequestDto, Request>();
            CreateMap<Passenger, PassengerDto>();
            CreateMap<PassengerDto, Passenger>();
            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto, Address>();

            //.ForMember(src => src.Title, dest => dest.MapFrom(x => x.VeryDifferentTitle));
            /*      CreateMap<Status, TodoItemStatus>()
                     .ProjectUsing(src => (TodoItemStatus)src);
                  CreateMap<TodoItemStatus, Status>()
                      .ProjectUsing(src => (Status)src);*/
        }
    }
}
