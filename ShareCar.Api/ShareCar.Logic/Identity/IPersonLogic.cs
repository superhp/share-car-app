using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Identity
{
    public interface IPersonLogic
    {
        void AddPerson(Person person);
        Person GetPersonByEmail(string email);
    }
}
