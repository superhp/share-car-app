using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareCar.Db.Entities
{
    public class Person
    {
        [Key]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LicensePlate { get; set; }
        public string Phone { get; set; }

        [ForeignKey("Email")]
        public virtual User User { get; set; }
    }
}
