using ShareCar.Db.Entities;

namespace ShareCar.Db.Repositories
{
    public interface IAddressRepository
    {
         bool AddNewAddress(Address address);
         Address FindAddressById(int id);
        int GetAddressId(Address address);

    }
}
