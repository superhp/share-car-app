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
<<<<<<< HEAD:ShareCar.Api/ShareCar.Logic/Request_Logic/RequestQueries.cs
            return true; // No validation
=======
            return true;
>>>>>>> dev:ShareCar.Api/ShareCar.Logic/RequestLogic/RequestQueries.cs
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
<<<<<<< HEAD:ShareCar.Api/ShareCar.Logic/Request_Logic/RequestQueries.cs

                return _databaseContext.Requests.Where(x => x.RequestId == rideId); // Throws exception if ride is not found

=======
            try
            {
                return _databaseContext.Requests.Where(x => x.RequestId == rideId); // Throws exception if ride is not found
            }
            catch
            {
                return null;
            }
>>>>>>> dev:ShareCar.Api/ShareCar.Logic/RequestLogic/RequestQueries.cs
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
<<<<<<< HEAD:ShareCar.Api/ShareCar.Logic/Request_Logic/RequestQueries.cs
            }
            catch{
                return false;
=======

>>>>>>> dev:ShareCar.Api/ShareCar.Logic/RequestLogic/RequestQueries.cs
            }
            catch
            {
                return false;
            }
        }
    }
}
