using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Exceptions
{
    public class AlreadyRequestedException : Exception
    {

        public AlreadyRequestedException(string message)
            : base(message)
        {

        }
    }
}
