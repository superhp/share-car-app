using Microsoft.EntityFrameworkCore;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShareCar.Db.Repositories
{
    public class RouteRepository: IRouteRepository
    {
        private readonly ApplicationDbContext _databaseContext;
        public RouteRepository(ApplicationDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public int GetRouteId(int fromId, int toId)
        {
            try
            {
                return _databaseContext.Routes.Single(x => x.FromId == fromId && x.ToId == toId).RouteId;
            }
            catch
            {
                return -1; // Address doesnt exist
            }
        }
        public Route FindRouteById(int id)
        {
            try
            {
                return _databaseContext.Routes.Single(x => x.RouteId == id); // Throws exception if ride is not found
            }
            catch
            {
                return null;
            }
        }
        public bool AddRoute(Route route)
        {
            try
            {
                _databaseContext.Routes.Add(route);
                _databaseContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public bool UpdateRoute(Route route)
        {
            Route routeToUpdate = FindRouteById(route.RouteId);
            if(routeToUpdate.Rides == null)
            {
                routeToUpdate.Rides = new List<Ride>();
            }
            foreach(var ride in route.Rides)
            {
                routeToUpdate.Rides.Add(ride);
            }
           
            _databaseContext.Routes.Update(routeToUpdate);
            _databaseContext.SaveChanges();
            return true;
        }

        public IEnumerable<Route> GetAllRoutes()
        {
                return _databaseContext.Routes;
            

            }
    }
}
