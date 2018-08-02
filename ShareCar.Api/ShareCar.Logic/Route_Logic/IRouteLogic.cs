using ShareCar.Dto;

namespace ShareCar.Logic.Route_Logic
{
    public interface IRouteLogic
    {
        int GetRouteId(int fromId, int toId);
        bool AddRoute(RouteDto route);
    }
}
