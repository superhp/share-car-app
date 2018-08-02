using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class Route
    {
        public int RouteId { get; set; }
        public int FromId { get; set; }
        public int ToId { get; set; }
        public List<Ride> Rides { get; set; }
        [ForeignKey("FromId")]
        public virtual Address AromAddress { get; set; }
        [ForeignKey("ToId")]
        public virtual Address ToAddress { get; set; }
    }
}
