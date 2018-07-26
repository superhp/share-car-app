using ShareCar.Db;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using ShareCar.Db.Entities;

namespace ShareCar.Logic.Request_Logic
{
    class RequestRepository
    {

        private readonly ApplicationDbContext _databaseContext;

        public RequestRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
        }

        public IEnumerable<Request> GetRequestsByUser(string driverEmail)
        {
            return _databaseContext.Requests.Where(x => x.DriverEmail == driverEmail && x.Status == Status.WAITING);
        }

        public IEnumerable<Request> GetRequestsByPassenger(string passengerEmail)
        {
            return _databaseContext.Requests.Where(x => x.PassengerEmail == passengerEmail); 
        }

  //      public AtomicRequest GetAtomicRequests(int requestId)
   //     {
         //   return _databaseContext.AtomicRequests.Single(x => x.RequestId == requestId);
   //     }


    }
}
