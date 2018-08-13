using AutoMapper;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories;
using ShareCar.Dto;
using ShareCar.Logic.Address_Logic;
using ShareCar.Logic.RideRequest_Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShareCar.Logic.Route_Logic
{
    public class RouteLogic: IRouteLogic
    {
        private readonly IMapper _mapper;
        private readonly IRideRequestLogic _rideRequestLogic;
        private readonly IRouteRepository _routeRepository;
        private readonly IAddressLogic _addressLogic;
        
        public RouteLogic(IRideRequestLogic rideRequestLogic, IRouteRepository routeRepository, IMapper mapper, IAddressLogic addressLogic)
        {
            _rideRequestLogic = rideRequestLogic;
            _routeRepository = routeRepository;
            _mapper = mapper;
            _addressLogic = addressLogic;
        }
        public int GetRouteId(int fromId, int toId)
        {
            int routeId = _routeRepository.GetRouteId(fromId, toId);
            return routeId;
        }
        
        public RouteDto GetRouteById(int id)
        {
            Route route = _routeRepository.FindRouteById(id);
            if (route == null)
            {
                return null;
            }
            
            RouteDto routeDto = new RouteDto
            {
                AddressFrom = _mapper.Map<Address, AddressDto>(route.FromAddress),
                AddressTo = _mapper.Map<Address, AddressDto>(route.ToAddress),
                FromId = route.FromId,
                ToId = route.ToId,
                RouteId = route.RouteId,
                Geometry = route.Geometry
            };
            return routeDto;
        }

        public List<RouteDto> GetRoutes(RouteDto routeDto, string email)
        {
            Address address = _mapper.Map<AddressDto,Address>(routeDto.AddressTo);
            bool isFromOffice = false;

            if (routeDto.AddressFrom != null)
            {
                address = _mapper.Map<AddressDto, Address>(routeDto.AddressFrom);
                isFromOffice = true;                
            }
            else
            {
             //   routeDto.AddressToId = _addressLogic.GetAddressId(address);

            }


            IEnumerable<Route> entityRoutes = _routeRepository.GetRoutes(isFromOffice, address);
            
            if (routeDto.FromTime != DateTime.MinValue)
            {
                foreach(var route in entityRoutes)
                {
                    foreach(var ride in route.Rides)
                    {
                        if((_rideRequestLogic.isAlreadyRequested(email, ride.RideId)) || (ride.DriverEmail == email) || (ride.RideDateTime<routeDto.FromTime) || (ride.isActive == false))
                        {
                            route.Rides.Remove(ride);
                        }
                    }
                }
            }
            if (routeDto.UntillTime != DateTime.MinValue)
            {
                foreach (var route in entityRoutes)
                {
                    foreach (var ride in route.Rides)
                    {
                        if ((_rideRequestLogic.isAlreadyRequested(email, ride.RideId)) || (ride.DriverEmail == email) || (ride.RideDateTime > routeDto.UntillTime) || (ride.isActive == false))
                        {
                            route.Rides.Remove(ride);
                        }
                    }
                }
            }
            List<RouteDto> dtoRoutes = new List<RouteDto>();
            foreach (var route in entityRoutes)
            {
                RouteDto mappedRoute = new RouteDto();
                mappedRoute.Rides = new List<RideDto>();
                if(route.Rides != null)
                {
                   
                    mappedRoute.AddressFrom = _mapper.Map<Address, AddressDto>(route.FromAddress);
                    mappedRoute.AddressTo = _mapper.Map<Address, AddressDto>(route.ToAddress);
                    mappedRoute.FromId = route.FromId;
                    mappedRoute.Geometry = route.Geometry;
                    foreach(var ride in route.Rides)
                    {
                        mappedRoute.Rides.Add(_mapper.Map<Ride, RideDto>(ride));
                    }
                    dtoRoutes.Add(mappedRoute);
                }
            }
            return dtoRoutes;
        }

        public bool AddRoute(RouteDto route)
        {
            Route entityRoute = new Route
            {
                FromId = route.FromId,
                ToId = route.ToId,
                Geometry = route.Geometry,
                FromAddress = _mapper.Map<AddressDto,Address>(route.AddressFrom),
                ToAddress = _mapper.Map<AddressDto, Address>(route.AddressTo)


            };
            //Route routes = _mapper.Map<RouteDto, Route>(route);
            _routeRepository.AddRoute(entityRoute);
            return true;
        }
    }
}
