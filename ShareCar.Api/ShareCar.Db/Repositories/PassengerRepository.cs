using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShareCar.Db.Repositories
{
    public class PassengerRepository: IPassengerRepository
    {
        private readonly ApplicationDbContext _databaseContext;
        public PassengerRepository(ApplicationDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public int GetUsersPoints(string email)
        {
            int points = _databaseContext.Passengers
                .Join(_databaseContext.Rides.Where(x => ((x.RideDateTime.Month == DateTime.Now.Month) && (x.DriverEmail == email))),
                x => x.RideId,
                y => y.RideId,
                (x, y) => x).Where(z => z.Completed == true).Count();
            return points;
        }
    }
}
