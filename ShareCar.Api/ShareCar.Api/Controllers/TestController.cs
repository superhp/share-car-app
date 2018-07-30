using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ShareCar.Api.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        public IActionResult Get()
        {
            return Ok("Works");
        }
    }
}