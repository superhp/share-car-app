using System.Collections.Generic;
using ShareCar.Dto;

namespace ShareCar.Logic.Route_Logic
{
    public interface IRouteLogic
    {
        int GetRouteId(int fromId, int toId);
        RouteDto GetRouteById(int id);
        bool AddRoute(RouteDto route);
        List<RouteDto> GetRoutes(RouteDto routeDto);
    }
}
