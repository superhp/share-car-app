using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Person_Logic
{
    public class PersonLogic : IPersonLogic
    {

        IPersonRepository _personRepository;

        public PersonLogic(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public void AddPerson(PersonDto person)
        {
            Person _person = new Person
            {
                Email = person.Email,
                FirstName = person.FirstName,
                LastName = person.LastName,
                LicensePlate = person.LicensePlate,
                Phone = person.Phone,
                ProfilePicture = person.ProfilePicture
            };
            _personRepository.AddPerson(_person);

        }

        public void UpdatePerson(PersonDto person)
        {
           var personToUpdate = _personRepository.GetPersonByEmail(person.Email);
             
            if (personToUpdate != null)
            {
                personToUpdate.FirstName = person.FirstName;
                personToUpdate.LastName = person.LastName;
                personToUpdate.LicensePlate = person.LicensePlate;
                personToUpdate.Phone = person.Phone;

                _personRepository.UpdatePerson(personToUpdate);
            }

        }

        public PersonDto GetPersonByEmail(string email)
        {
            Person person = _personRepository.GetPersonByEmail(email);
            if (person != null)
            {
                return new PersonDto
                {
                    Email = person.Email,
                    FirstName = person.FirstName,
                    LastName = person.LastName,
                    LicensePlate = person.LicensePlate,
                    Phone = person.Phone,
                    ProfilePicture = person.ProfilePicture

                };
            } else
            {
                return null;
            }
        }
    }
}
