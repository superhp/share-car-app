using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Address_Logic
{
   public interface IAddressLogic
    {
        bool AddNewAddress(AddressDto address);
        AddressDto GetAddressById(int id);
        int GetAddressId(AddressDto address);

    }
}
