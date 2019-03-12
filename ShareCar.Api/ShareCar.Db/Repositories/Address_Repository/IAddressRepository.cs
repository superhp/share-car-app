using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Db.Repositories.Address_Repository
{
    public interface IAddressRepository
    {
        void AddNewAddress(Address address);
         Address GetAddressById(int id);
         int GetAddressId(Address address);

    }
}
