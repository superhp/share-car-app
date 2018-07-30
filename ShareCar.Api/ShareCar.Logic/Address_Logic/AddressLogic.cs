using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;

namespace ShareCar.Logic.Address_Logic
{
    class AddressLogic : IAddressLogic
    {
        private readonly IAddressRepository _addressRepository;
        public AddressLogic(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }
        public bool AddNewAddress(Address address)
        {
            throw new NotImplementedException();
        }

        public AddressDto GetAddress(int id)
        {
            
         Address address = _addressRepository.GetAddress(id);

            return new AddressDto
            {
                City = address.City,
                Country = address.Country,
                Street = address.Street,
                Number = address.Number
            };
        }
    }
}
