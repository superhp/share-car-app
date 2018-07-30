using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;

namespace ShareCar.Logic.Identity
{
    public class PersonLogic : IPersonLogic
    {

        IPersonRepository _personRepository;

        public PersonLogic(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public void AddPerson(Person person)
        {
            _personRepository.AddPerson(person);
        }

        public Person GetPersonByEmail(string email)
        {
            return _personRepository.GetPersonByEmail(email);
        }
    }
}
