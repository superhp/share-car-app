using ShareCar.Db.Entities;
using System.Collections.Generic;

namespace ShareCar.Db.Repositories
{
    public interface IRouteRepository
    {
        int GetRouteId(int fromId, int toId);
        Route FindRouteById(int id);
        bool AddRoute(Route route);
        IEnumerable<Route> GetAllRoutes();
    }
}
