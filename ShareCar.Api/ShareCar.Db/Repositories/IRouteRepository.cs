using ShareCar.Db.Entities;

namespace ShareCar.Db.Repositories
{
    public interface IRouteRepository
    {
        int GetRouteId(int fromId, int toId);
        bool AddRoute(Route route);
    }
}
