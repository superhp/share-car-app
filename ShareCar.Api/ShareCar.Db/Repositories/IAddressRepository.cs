using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Db.Repositories
{
    public interface IAddressRepository
    {
         Task<bool> AddNewAddress(Address address);
         Address FindAddressById(int id);
        int GetAddressId(Address address);

    }
}
