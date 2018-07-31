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
        public bool AddNewAddress(AddressDto address)
        {
            Address entityAddress = new Address
            {
                City = address.City,
                Street = address.Street,
                Number = address.Number
            };
            
              return _addressRepository.AddNewAddress(entityAddress);

        }

        public int GetAddressId(AddressDto address)
        {

            Address entityAddress = new Address
            {
                City = address.City,
                Street = address.Street,
                Number = address.Number
            };


            int id = _addressRepository.GetAddressId(entityAddress);

            if (id == -1)
            {
                bool added = _addressRepository.AddNewAddress(entityAddress);

                if (added)
                {
                    return _addressRepository.GetAddressId(entityAddress);
                }
            }

            return id;

        }

        public AddressDto FindAddressById(int id)
        {
            
         Address address = _addressRepository.FindAddressById(id);

            return new AddressDto
            {
                AddressId = address.AddressId,
                Latitude = address.Latitude,
                Longtitude = address.Longtitude,
                City = address.City,
                Country = address.Country,
                Street = address.Street,
                Number = address.Number
            };
        }
    }
}
