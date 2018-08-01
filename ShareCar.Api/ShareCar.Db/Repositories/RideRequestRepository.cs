using System.Collections.Generic;
using ShareCar.Db.Entities;
using System.Linq;

namespace ShareCar.Db.Repositories
{
   public class RideRequestRepository : IRideRequestRepository
    {

        private readonly ApplicationDbContext _databaseContext;


        public RideRequestRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
        }


        public bool AddRequest(Request request)
        {

            _databaseContext.Requests.Add(request);
            _databaseContext.SaveChanges();
            return true;
        }

        public IEnumerable<Request> FindDriverRequests(string email)
        {
            return _databaseContext.Requests.Where(x => x.DriverEmail == email && x.Status == Db.Entities.Status.WAITING);
        }

        public IEnumerable<Request> FindPassengerRequests(string email)
        {
            return _databaseContext.Requests.Where(x => x.PassengerEmail == email && (x.SeenByPassenger == false || x.Status == Db.Entities.Status.WAITING));
        }

        public Request FindRequestById(int id)
        {
            return _databaseContext.Requests.Single(x => x.RequestId == id);
        }

        public void SeenByDriver(int[] requests)
        { 

            foreach(int id in requests)
            {
                Request toUpdate = _databaseContext.Requests.Single(x => x.RequestId == id);
                toUpdate.SeenByDriver = true;
            }
            _databaseContext.SaveChanges();

        }

        public void SeenByPassenger(int[] requests)
        {
            foreach (int id in requests)
            {
                Request toUpdate = _databaseContext.Requests.Single(x => x.RequestId == id);
                toUpdate.SeenByPassenger = true;
            }
            _databaseContext.SaveChanges();
        }

        public bool UpdateRequest(Request request)
        {
            try
            {
                Request toUpdate = _databaseContext.Requests.Single(x => x.RequestId == request.RequestId);
                toUpdate.Status = request.Status;
                toUpdate.SeenByPassenger = false;
                _databaseContext.SaveChanges();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        
    }
}
