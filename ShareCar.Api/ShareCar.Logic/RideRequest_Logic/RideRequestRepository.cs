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
            request.DriverEmail = "edgar.reis447@gmail.com";
            request.PassengerEmail = "ragde447@gmail.com";
            request.Status = Db.Entities.Status.ACCEPTED;
            //request.RideId = 3;
            _databaseContext.Requests.Add(request);
            _databaseContext.SaveChanges();
            return true;
        }

        public IEnumerable<Request> FindDriverRequests(string email)
        {
            return _databaseContext.Requests.Where(x => x.DriverEmail == email);
        }

        public IEnumerable<Request> FindPassengerRequests(string email)
        {
            return _databaseContext.Requests.Where(x => x.PassengerEmail == email);
        }

        public bool UpdateRequest(Request request)
        {
          Request toUpdate =  _databaseContext.Requests.Single(x => x.RequestId == request.RequestId);
            toUpdate.Status = request.Status;
            toUpdate.SeenByPassenger = false;
            return true;

        }

        
    }
}
