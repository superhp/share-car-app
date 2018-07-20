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
        public IActionResult GetByRide(int rideId)
        {


          RideDto ride = rideLogic.FindRideById(rideId);

            if(ride == null)
            {
                return BadRequest();
            }
            return Ok(ride);
        }



        [HttpGet]
        public IActionResult GetByDriver(int driverId)
        {

        //    Ride item = _dbContext.Rides.Where(t => t.DriverId == driverId);

            if (item == null)
            {
                return BadRequest();
            }

            return Ok(MapToDto(item));

        }

        [HttpGet]
        public IActionResult Get(DateTime rideDate)
        {

        //    Ride item = _dbContext.Rides.Where(t => t.date == rideDate);

            if (item == null)
            {
                return BadRequest("Selected day doesn't have any rides");
            }

            return Ok(MapToDto(item));

        }

        [HttpGet]
        public IActionResult GetFrom(string addressFrom)
        {

         //   Ride item = _dbContext.Rides.Where(t => t.from == addressFrom);

            if (item == null)
            {
                return BadRequest("There is no rides from given address");
            }

            return Ok(MapToDto(item));

        }

        // Any object update, if user doesn't change properti, it should be delivered unchanged
        [HttpPut]
        public IActionResult Put(RideDto ride)
        {
            if (ride == null)
            {
                return BadRequest("Error occured while passing parameters");
            }

       //     Ride item = _dbContext.Rides.Single(t => t.DriverId == ride.DriverId);

            if (item == null)
            {
                return NotFound("Selected driver doesn't exist");
            }

        //    Ride updatedRide = MapFromDto(ride);

            return Ok(MapToDto(item));

        }

        // Any object update, if user doesn't change properti, it should be delivered unchanged
        [HttpPost]
        public IActionResult Post(RideDto ride)
        {
            if (ride == null)
            {
                return BadRequest("Error occured while passing parameters");
            }

            //Ride item = _dbContext.Rides.Single(t => t.DriverId == ride.DriverId);




            if (item == null)
            {
                return NotFound("Selected driver doesn't exist");
            }

            Ride updatedRide = MapFromDto(ride);

            return Ok(MapToDto(item));

        }


        [HttpPatch]
        public IActionResult GetTo(string addressTo)
        {

          //  Ride item = _dbContext.Rides.Where(t => t.to == addressTo);

            if (item == null)
            {
                return BadRequest("There is no rides to a given address");
            }

            return Ok(MapToDto(item));

        }

        private RideDto MapToDto(Ride ride)
        {
            return new RideDto
            {
                RideId = ride.RideId,
                FromId = ride.FromId,
                ToId = ride.ToId,
                DriverId = ride.DriverId,
                DateTime = ride.DateTime
            };
        }

        private Ride MapFromDto(RideDto ride)
        {
            return new Ride
            {
                RideId = ride.RideId,
                FromId = ride.FromId,
                ToId = ride.ToId,
                DriverId = ride.DriverId,
                DateTime = ride.DateTime
            };
        }


    }


}