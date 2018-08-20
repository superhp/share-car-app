using System.Collections.Generic;
using ShareCar.Db.Entities;

namespace ShareCar.Db.Repositories.Route_Repository
{
    public interface IRouteRepository
    {
        int GetRouteId(int fromId, int toId);
        Route GetRouteById(int id);
        void AddRoute(Route route);
        void UpdateRoute(Route route);
        IEnumerable<Route> GetRoutes(bool isOfficeAddress, Address address);
    }
}
