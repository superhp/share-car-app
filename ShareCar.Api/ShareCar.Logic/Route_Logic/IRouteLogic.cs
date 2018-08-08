using ShareCar.Dto;
using System.Collections.Generic;

namespace ShareCar.Logic.Route_Logic
{
    public interface IRouteLogic
    {
        int GetRouteId(int fromId, int toId);
        RouteDto GetRouteById(int id);
        bool AddRoute(RouteDto route);
        IEnumerable<RouteDto> GetAllRoutes();
    }
}
