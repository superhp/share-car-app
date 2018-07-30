using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;
namespace ShareCar.Logic.Person_Logic
{
   public interface IPersonRepository
    {
         void AddPerson(Person person);
        Person GetPersonByEmail(string email);
    }
}
