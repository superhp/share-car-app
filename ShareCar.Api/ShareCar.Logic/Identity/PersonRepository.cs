using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db;
using ShareCar.Db.Entities;
using System.Linq;
namespace ShareCar.Logic.Person_Logic
{
    class PersonRepository : IPersonRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public PersonRepository (ApplicationDbContext context)
        {
            _databaseContext = context;
        }

        public void AddPerson(Person person)
        {
            _databaseContext.People.Add(person);
            _databaseContext.SaveChanges();
        }

        public void UpdatePerson(Person person)
        {
            _databaseContext.People.Update(person);
            _databaseContext.SaveChanges();
        }

        public Person GetPersonByEmail(string email)
        {
            try {
                    return _databaseContext.People.Single(x => x.Email == email);
            }
            catch(Exception)
            {
                return null;
            }
            }
    }
}
