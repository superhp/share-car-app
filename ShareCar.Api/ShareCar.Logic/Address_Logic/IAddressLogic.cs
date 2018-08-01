using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ShareCar.Logic.Address_Logic
{
   public interface IAddressLogic
    {
        Task<bool> AddNewAddress(AddressDto address);
        AddressDto FindAddressById(int id);
        Task<int> GetAddressId(AddressDto address);

    }
}
