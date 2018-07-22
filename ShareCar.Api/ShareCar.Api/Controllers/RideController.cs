using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Identity;

namespace ShareCar.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Ride")]
    public class RideController : Controller
    {
        private readonly IRideLogic rideLogic;

        [HttpGet]
        public IActionResult GetRideById(int rideId)
        {

          RideDto ride = rideLogic.FindRideById(rideId);

            if (ride == null)
            {
                return NotFound();
            }
            return Ok(ride);
        }



        [HttpGet]
        public void GetRidesByDriver(string driverEmail)
        {

            IEnumerable<RideDto> Rides = rideLogic.FindRidesByDriver(driverEmail);

            SendResponse(Rides);


        }

        [HttpGet]
        public void GetRidesByDate(DateTime rideDate)
        {

            IEnumerable<RideDto> Rides = rideLogic.FindRidesByDate(rideDate);

            SendResponse(Rides);

        }

        [HttpGet]
        public void GetRidesByStartPoint(AddressDto addressFrom)
        {

            IEnumerable<RideDto> Rides = rideLogic.FindRidesByStartPoint(addressFrom);

            SendResponse(Rides);

        }

        [HttpGet]
        public void GetRidesByDestination(AddressDto addressTo)
        {

            IEnumerable<RideDto> Rides = rideLogic.FindRidesByDestination(addressTo);

            SendResponse(Rides);

        }

        // Any object update. If user doesn't change property, it should be delivered unchanged
        [HttpPut]
        public IActionResult Put(RideDto ride)
        {
            if (ride == null)
            {
                return BadRequest("Invalid parameter");
            }

            bool result = rideLogic.UpdateRide(ride);

            if(result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Operation failed");
            }

        }

        // Any object update, if user doesn't change properti, it should be delivered unchanged
        [HttpPost]
        public IActionResult Post(RideDto ride)
        {
            if (ride == null)
            {
                return BadRequest("Invalid parameter");
            }

            bool result = rideLogic.AddRide(ride);

            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Operation failed");
            }

        }

        private IActionResult SendResponse(IEnumerable<RideDto> ride)
        {

            if (ride == null)
            {
                return NotFound();
            }
            return Ok(ride);
        }

    }


}