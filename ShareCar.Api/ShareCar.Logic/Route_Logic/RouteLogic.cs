using AutoMapper;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories;
using ShareCar.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Route_Logic
{
    public class RouteLogic: IRouteLogic
    {
        private readonly IMapper _mapper;
        private readonly IRouteRepository _routeRepository;
        public RouteLogic(IRouteRepository routeRepository, IMapper mapper)
        {
            _routeRepository = routeRepository;
            _mapper = mapper;
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

            return _mapper.Map<Route, RouteDto>(route);
        }
        public bool AddRoute(RouteDto route)
        {
            Route entityRoute = new Route
            {
                FromId = route.FromId,
                ToId = route.ToId
            };
            //Route routes = _mapper.Map<RouteDto, Route>(route);
            _routeRepository.AddRoute(entityRoute);
            return true;
        }
    }
}
