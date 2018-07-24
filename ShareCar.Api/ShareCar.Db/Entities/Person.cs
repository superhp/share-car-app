using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class Person
    {
        [Key]
        public string Email { get; set; }
        //public List<Ride> Ride { get; set; }
        
    }
}
