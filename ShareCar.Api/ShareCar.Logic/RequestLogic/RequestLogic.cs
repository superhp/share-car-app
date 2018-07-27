using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Logic.ObjectMapping;

namespace ShareCar.Logic.RequestLogic
{
    class RequestLogic : IRequestLogic
    {
        private readonly IRequestQueries _requestQueries;
        private RequestMapper _requestMapper = new RequestMapper();
        private AddressMapper _addressMapper = new AddressMapper();

        public RequestLogic(IRequestQueries requestQueries)
        {
            _requestQueries = requestQueries;
        }
        public RequestDto FindRequestByRequestId(int id)
        {
            Request request = _requestQueries.FindRequestByRequestId(id);

            if (request == null)
            {
                return null;
            }
            else return _requestMapper.MapToDto(request);
        }
        public IEnumerable<RequestDto> FindRequestsByPassengerEmail(string email)
        {
            IEnumerable<Request> requests = _requestQueries.FindRequestsByPassengerEmail(email);
            return MapToList(requests);
        }

        public bool AddRequest(RequestDto request)
        {
           return _requestQueries.AddRequest(_requestMapper.MapToEntity(request));
        }


        public IEnumerable<RequestDto> FindRequestByRideId(int rideId)
        {
            IEnumerable<Request> requests = _requestQueries.FindRequestByRideId(rideId);
            return MapToList(requests);
        }

        public IEnumerable<RequestDto> FindRequestsByDriverEmail(string email)
        {
            IEnumerable<Request> requests = _requestQueries.FindRequestsByDriverEmail(email);
            return MapToList(requests);
        }

        

        public IEnumerable<RequestDto> FindRidesByPickUpPoint(AddressDto address)
        {
            IEnumerable<Request> requests = _requestQueries.FindRidesByPickUpPoint(_addressMapper.MapToEntity(address));
            return MapToList(requests);
        }

        public bool UpdateRequest(RequestDto request)
        {
                return _requestQueries.UpdateRequest(_requestMapper.MapToEntity(request));

                    }
    

        // Returns a list of mapped objects
        private IEnumerable<Request> MapToList(IEnumerable<RequestDto> requests)
        {
            List<Request> DtoRides = new List<Request>();

            foreach (var request in requests)
            {
                DtoRides.Add(_requestMapper.MapToEntity(request));
            }
            return DtoRides;
        }
        private IEnumerable<RequestDto> MapToList(IEnumerable<Request> requests)
        {

            List<RequestDto> DtoRequests = new List<RequestDto>();

            foreach (var request in requests)
            {
                DtoRequests.Add(_requestMapper.MapToDto(request));
            }
            return DtoRequests;
        }

    }
}
