using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Request_Logic;

namespace ShareCar.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/g")]
    public class temp : Controller
    {
        private readonly IRequestLogic _requestLogic;

        public temp(IRequestLogic requestLogic)
        {
            _requestLogic = requestLogic;
        }

        [HttpGet("{requestId}")]
        public IActionResult GetRequestById(int requestId)
        {
            RequestDto request = _requestLogic.FindRequestByRequestId(requestId);
            if (request == null)
            {
                return NotFound("Operation failed");
            }
            return Ok(request);
        }
        [HttpGet("{passengerEmail}")]
        public IActionResult GetRequestByPassengerEmail(string passengerEmail)
        {
            IEnumerable<RequestDto> request = _requestLogic.FindRequestsByPassengerEmail(passengerEmail);
            if (request != null)
            {
                return Ok(request);
            }
            else
            {
                return BadRequest("Operation failed");
            }
        }
        [HttpGet("{driverEmail}")]
        public IActionResult GetRequestsByPassengerEmail(string driverEmail)
        {
            IEnumerable<RequestDto> request = _requestLogic.FindRequestsByDriverEmail(driverEmail);
            if (request != null)
            {
                return Ok(request);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("{addressId}")]
        public void GetRequestsByPickUpPoint(AddressDto addressId)
        {

            IEnumerable<RequestDto> request = _requestLogic.FindRidesByPickUpPoint(addressId);

            if (request != null)
            {
                Ok(request);
            }
            else
            {
                BadRequest("Operation failed");
            }
        }
        [HttpGet("{rideId}")]
        public IActionResult GetRequestByRide(int rideId)
        {
            IEnumerable<RequestDto> request = _requestLogic.FindRequestByRideId(rideId);
            if (request != null)
            {
                return Ok(request);
            }
            else
            {
                return BadRequest("Operation failed");
            }
        }
        [HttpPost]
        public IActionResult Post([FromBody] RequestDto request)
        {
            if (request == null)
            {
                return BadRequest("Invalid input");
            }

            bool result = _requestLogic.AddRequest(request);

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Operation failed");
            }
        }
        [HttpPut]
        public IActionResult Put([FromBody] string request)
        {
            if (request == null)
            {
                return BadRequest("Invalid parameter");
            }
            //  bool result = _requestLogic.UpdateRequest(request);

            //   if (result)
            {
                return Ok();
            }
            //    else
            {
                //      return BadRequest("Operation failed");
            }
        }
    }
}