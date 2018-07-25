using System.ComponentModel.DataAnnotations;

namespace ShareCar.Db.Entities
{
    public class Person
    {
        [Key]
        public string Email { get; set; }
        //public List<Ride> Ride { get; set; }
        
    }
}
