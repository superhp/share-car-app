using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Address_Logic
{
    public interface IAddressRepository
    {
         bool AddNewAddress(Address address);
         Address GetAddressById(int id);
        int GetAddressId(Address address);

    }
}
