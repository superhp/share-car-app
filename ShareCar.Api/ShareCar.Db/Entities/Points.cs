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
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
    public enum Role
    {
        PASSENGER,
        DRIVER
    }
}
