using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto.Identity;
using ShareCar.Logic.Address_Logic;

namespace ShareCar.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Location")]
    public class LocationController : Controller
    {
        private readonly IAddressLogic _addressLogic;

        public LocationController(IAddressLogic addressLogic)
        {
            _addressLogic = addressLogic;
        }

        [HttpPost]
        public IActionResult GetAddressId([FromBody] AddressDto address)
        {
            int addressId = _addressLogic.GetAddressId(address);

            if (addressId != -1)
                return Ok(addressId);

            return BadRequest(addressId);
        }
    }
}