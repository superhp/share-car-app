using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;
namespace ShareCar.Db.Repositories
{
   public interface IPersonRepository
    {
        void AddPerson(Person person);
        void UpdatePerson(Person person);
        Person GetPersonByEmail(string email);
    }
}
