using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Logic.ObjectMapping;
using System.Linq;
namespace ShareCar.Logic.RideRequest_Logic
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
            return _databaseContext.Requests.Where(x => x.PassengerEmail == email);
        }

        public Request FindRequestById(int id)
        {
            return _databaseContext.Requests.Single(x => x.RequestId == id);
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
