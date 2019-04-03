using System;
using ShareCar.Db;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutomatedTasks
{
    public class DataCleanUp
    {
        private readonly ApplicationDbContext _databaseContext;

        public DataCleanUp(ApplicationDbContext context)
        {
            _databaseContext = context;
        }
        public void DeleteOldRequests()
        {
            var date = DateTime.Now;
            var requests = _databaseContext.Requests
             .Join(_databaseContext.Rides.Where(x => ((x.RideDateTime.Ticks < date.Ticks))),
               x => x.RideId,
               y => y.RideId,
              (x, y) => x);

            foreach (var request in requests)
            {
                _databaseContext.Remove(request);
            }
            _databaseContext.SaveChanges();
        }

        public void DeleteOldRides()
        {
            var date = DateTime.Now;
            var rides = _databaseContext.Rides.Where(x => x.RideDateTime.Ticks < date.Ticks);

            foreach (var ride in rides)
            {
                _databaseContext.Remove(ride);
            }
            _databaseContext.SaveChanges();
        }



    }
}
