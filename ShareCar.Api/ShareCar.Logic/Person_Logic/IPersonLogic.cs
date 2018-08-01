using ShareCar.Db.Entities;
using ShareCar.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Person_Logic
{
    public interface IPersonLogic
    {
        void AddPerson(PersonDto person);
        void UpdatePerson(PersonDto person);
        PersonDto GetPersonByEmail(string email);
    }
}
