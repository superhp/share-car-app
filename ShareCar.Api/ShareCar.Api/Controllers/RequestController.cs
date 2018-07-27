using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShareCar.Dto.Identity;

namespace ShareCar.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Request")]
    public class RequestController : Controller
    {
        [HttpGet]
        public void GetRequestById()
        {/*
            RequestDto request = _requestLogic.FindRequestByRequestId(requestId);
            if (request == null)
            {
                return NotFound("Operation failed");
            }
            return Ok(request);*/
        }
        [HttpPut]
        public IActionResult Post([FromBody]  RideDto ride)
        {/*
            RequestDto request = _requestLogic.FindRequestByRequestId(requestId);
            if (request == null)
            {
                return NotFound("Operation failed");
            }*/
            return Ok();
        }
    }
}