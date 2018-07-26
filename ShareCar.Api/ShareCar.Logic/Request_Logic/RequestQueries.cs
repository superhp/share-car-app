using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ShareCar.Db;
using ShareCar.Db.Entities;
using ShareCar.Logic.ObjectMapping;

namespace ShareCar.Logic.Request_Logic
{
    class RequestQueries : IRequestQueries
    {
        private readonly ApplicationDbContext _databaseContext;
        private readonly RequestMapper _requestMapper;

        public RequestQueries(ApplicationDbContext context, RequestMapper requestMapper)
        {
            _databaseContext = context;
            _requestMapper = requestMapper;
        }

        public bool AddRequest(Request request)
        {
            _databaseContext.Requests.Add(request);
            _databaseContext.SaveChanges();
            return true; // No validation
        }

        public Request FindRequestByRequestId(int id)
        {
            try
            {
                return _databaseContext.Requests.Single(x => x.RequestId == id); // Throws exception if request is not found
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<Request> FindRequestByRideId(int rideId)
        {

                return _databaseContext.Requests.Where(x => x.RequestId == rideId); // Throws exception if ride is not found

        }

        public IEnumerable<Request> FindRequestsByDriverEmail(string email)
        {
            return _databaseContext.Requests.Where(x => x.DriverEmail == email);
        }

        public IEnumerable<Request> FindRequestsByPassengerEmail(string email)
        {
            return _databaseContext.Requests.Where(x => x.PassengerEmail == email);
        }

        public IEnumerable<Request> FindRidesByPickUpPoint(Address address)
        {
            return _databaseContext.Requests.Where(x => x.AddressId == address.AddressId);
        }

        public bool UpdateRequest(Request request)
        {
          
                try
            {
                Request toUpdate = _databaseContext.Requests.Single(x => x.RequestId == request.RequestId);
                _requestMapper.MapEntityToEntity(toUpdate, request);
                _databaseContext.SaveChanges();
                return true;
            }
            catch{
                return false;
            }
        }
    }
}
