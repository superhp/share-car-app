using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ShareCar.Db.Repositories.Address_Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public AddressRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
        }

        public void AddNewAddress(Address address)
        {
                _databaseContext.Addresses.Add(address);
                _databaseContext.SaveChanges();
        }

        // Address consists of street, house number and city or geo coordinates
        public int GetAddressId(Address address)
        {
            if (address.City != null && address.Street != null && address.Number != null)
            {
                try
                {
                    
                    return  _databaseContext.Addresses.First(x => x.City == address.City && x.Street == address.Street && x.Number == address.Number).AddressId;
                }
                catch(Exception e)
                {
                    return -1;
                }
            }


              else  if (address.Longtitude != 0 && address.Latitude != 0)
                {
                    try
                    {

                        return _databaseContext.Addresses.Single(x => x.Longtitude == address.Longtitude && x.Latitude == address.Latitude).AddressId;

                    }
                    catch
                    {
                        return -1; // Address doesnt exist

                    }
                

            }
            return - 1;
            
        }

        public Address GetAddressById(int id)
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
