using ShareCar.Db.Entities;

namespace ShareCar.Db.Repositories
{
    public interface IRouteRepository
    {
        int GetRouteId(int fromId, int toId);
        Route FindRouteById(int id);
        bool AddRoute(Route route);
        bool UpdateRoute(Route route);
    }
}
