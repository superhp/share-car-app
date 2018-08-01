using ShareCar.Db.Entities;
using ShareCar.Dto.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.ObjectMapping
{
    public class AddressMapper
    {
        public Address MapToEntity(AddressDto address)
        {
            return new Address
            {
                Country = address.Country,
                City = address.City,
                Street = address.Street,
                Number = address.Number,
                Longtitude = address.Longtitude,
                Latitude = address.Latitude
            };
        }

        public AddressDto MapToDto(Address passenger)
        {
            throw new NotImplementedException();
        }

    }
}
