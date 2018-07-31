﻿using System;
using System.Collections.Generic;
using System.Text;
using ShareCar.Db;
using ShareCar.Db.Entities;
using System.Linq;
namespace ShareCar.Logic.Address_Logic
{
    class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public AddressRepository(ApplicationDbContext context)
        {
            _databaseContext = context;
        }
        public bool AddNewAddress(Address address)
        {
            try
            {
                _databaseContext.Addresses.Add(address);
                _databaseContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public int GetAddressId(Address address)
        {
            try
            {
              return  _databaseContext.Addresses.Single(x => x.City == address.City && x.Street == address.Street && x.Number == address.Number).AddressId;
            }
            catch
            {
                return -1; // Address doesnt exist
            }
        }

        public Address FindAddressById(int id)
        {
            try
            {
           return _databaseContext.Addresses.SingleOrDefault(x => x.AddressId == id);

            }
            catch
            {
                return null;
            }
        }
    }
}
