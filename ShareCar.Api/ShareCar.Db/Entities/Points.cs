using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class Points
    {
        public Role Role { get; set; }
        public int PointCount { get; set; }
        public int UserEmail { get; set; }

        [ForeignKey("UserId")]
        public Person Person { get; set; }
    }
    public enum Role
    {
        PASSENGER,
        DRIVER
    }
}
