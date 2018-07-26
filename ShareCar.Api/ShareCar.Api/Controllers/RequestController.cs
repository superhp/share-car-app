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
    [Route("api/tt")]
    public class RequestController : Controller
    {
        private readonly IRequestLogic _requestLogic;

        public RequestController(IRequestLogic requestLogic)
        {
            _requestLogic = requestLogic;
        }

        //[HttpGet("{requestId}")]
        [HttpGet]
        public IActionResult GetRequestById(int requestId)
        {
            RequestDto request = _requestLogic.FindRequestByRequestId(requestId);
            if (request == null)
            {
                return NotFound("Operation failed");
            }
            return Ok(request);
        }
    }
}