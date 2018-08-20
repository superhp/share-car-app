using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Db.Repositories
{
    public interface IAddressRepository
    {
         bool AddNewAddress(Address address);
         Address GetAddressById(int id);
        int GetAddressId(Address address);

    }
}
