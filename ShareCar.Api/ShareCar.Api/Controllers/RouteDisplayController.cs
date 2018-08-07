using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShareCar.Api.Controllers
{



    [Produces("application/json")]
    [Route("api/RouteDisplay")]
    public class RouteDisplayController : Controller
    {

       public struct Coordinates
        {
            public double Longtitude { get; set; }
            public double Latitude { get; set; }
        }

        [HttpPost]
        public IActionResult Test([FromBody] Coordinates coordinates)
        {
            string url = "http://cts-maps.northeurope.cloudapp.azure.com/nearest/v1/driving/" + coordinates.Longtitude.ToString() + ',' + coordinates.Latitude.ToString();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://cts-maps.northeurope.cloudapp.azure.com/nearest/v1/driving/" + coordinates.Longtitude.ToString() + ',' + coordinates.Latitude.ToString());
            return Ok(request);
            //cts-maps.northeurope.cloudapp.azure.com/nearest/v1/driving/
        }
    }
}