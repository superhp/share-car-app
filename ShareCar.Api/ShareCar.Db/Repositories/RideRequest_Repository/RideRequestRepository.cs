using System.Collections.Generic;
using ShareCar.Db.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace ShareCar.Db.Repositories.RideRequest_Repository
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
            try
            {
                _databaseContext.Requests.Add(request);
                _databaseContext.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        public IEnumerable<Request> GetDriverRequests(string email)
        {

                return _databaseContext.Requests.Where(x => x.DriverEmail == email && x.Status == Status.WAITING).ToList();

        }

        public IEnumerable<Request> GetRequestsByRideId(int rideId)
        {
            return _databaseContext.Requests.Where(x => x.RideId == rideId && x.Status != Status.DELETED).ToList();
        }

        public bool DeletedRide(IEnumerable<Request> requests)
        {
            try
            {
                foreach (Request request in requests)
                {
                    Request toUpdate = _databaseContext.Requests.Find(request.RequestId);
                    if (toUpdate == null)
                    {
                        return false;
                    }
                    toUpdate.SeenByPassenger = false;
                    toUpdate.Status = Status.DELETED;
                }
                _databaseContext.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public IEnumerable<Request> GetPassengerRequests(string email)
        {
            return _databaseContext.Requests.Where(x => x.PassengerEmail == email && (x.SeenByPassenger == false || (x.Status != Status.DENIED && x.Status != Status.DELETED))).ToList();
        }

        public Request GetRequestById(int id)
        {
                return _databaseContext.Requests.Find(id);
        }

        public IEnumerable<Request> GetAcceptedRequests(string passengerEmail)
        {
            return _databaseContext.Requests.Where(x => x.PassengerEmail == passengerEmail && x.Status == Status.DENIED).ToList();
        }

        public void SeenByDriver(int[] requests)
        {

                foreach (int id in requests)
                {
                    Request toUpdate = _databaseContext.Requests.Single(x => x.RequestId == id);
                    toUpdate.SeenByDriver = true;
                }

                _databaseContext.SaveChanges();
            }

        public void SeenByPassenger(int[] requests)
        {
            IEnumerable<Request> toUpdate = _databaseContext.Requests.Where(x => requests.Contains(x.RequestId));

            foreach (var request in toUpdate)
            {
                request.SeenByPassenger = true;
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
                _databaseContext.Requests.Update(toUpdate);
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
