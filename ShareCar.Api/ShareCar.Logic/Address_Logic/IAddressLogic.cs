using ShareCar.Dto;

namespace ShareCar.Logic.Address_Logic
{
   public interface IAddressLogic
    {
        bool AddNewAddress(AddressDto address);
        AddressDto FindAddressById(int id);
        int GetAddressId(AddressDto address);

    }
}
