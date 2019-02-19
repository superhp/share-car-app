using Microsoft.EntityFrameworkCore;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShareCar.Db.Repositories.Route_Repository
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
        public Route GetRouteById(int id)
        {
            try
            {
                return _databaseContext.Routes.Single(x => x.RouteId == id); 
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
            try
            {
                Route routeToUpdate = GetRouteById(route.RouteId);
                if (routeToUpdate.Rides == null)
                {
                    routeToUpdate.Rides = new List<Ride>();
                }
                foreach (var ride in route.Rides)
                {
                    routeToUpdate.Rides.Add(ride);
                }

                _databaseContext.Routes.Update(routeToUpdate);
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public IEnumerable<Route> GetRoutes(bool isFromOffice, Address address)
        {
            if (isFromOffice)
            {
                return _databaseContext.Routes.Include(x => x.Rides)
                    .Include(x => x.FromAddress)
                    .Include(x => x.ToAddress)
                    .Where(x => x.FromAddress.City == address.City && x.FromAddress.Street == address.Street && x.FromAddress.Number == address.Number);
            }
            else
            {
                return _databaseContext.Routes.Include(x => x.Rides)
                    .Include(x => x.FromAddress)
                    .Include(x => x.ToAddress)
                    .Where(x => x.ToAddress.City == address.City && x.ToAddress.Street == address.Street && x.ToAddress.Number == address.Number);
            }
        }
        
    }
}
