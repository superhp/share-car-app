using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db;
using ShareCar.Db.Entities;
using System.Linq;
namespace ShareCar.Logic.Address_Logic
{
    class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public AddressRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
        }
        public bool AddNewAddress(Address address)
        {
            throw new NotImplementedException();
        }

        public Address GetAddress(int id)
        {
            try
            {
           return _databaseContext.Addresses.Single(x => x.AddressId == id);

            }
            catch
            {
                return null;
            }
        }
    }
}
