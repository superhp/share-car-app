using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db;
using ShareCar.Db.Entities;
using System.Linq;
namespace ShareCar.Db.Repositories
{
   public class PersonRepository : IPersonRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public PersonRepository (ApplicationDbContext context)
        {
            _databaseContext = context;
        }

        public void AddPerson(Person person)
        {
            try // For some reason method is called (somehow) when driver accepts or rejects requests, method call is untrackable by debbuging
            {
                _databaseContext.People.Add(person);
                _databaseContext.SaveChanges();
            }
            catch
            {

            }
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
