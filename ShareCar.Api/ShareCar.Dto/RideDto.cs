using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Dto
{
    public class RideDto
    {
        public int RideId { get; set; }
        public int RouteId { get; set; }
        public RouteDto Route { get; set; }
        /*
        public double FromLongitude { get; set; }
        public double FromLatitude { get; set; }
        public double ToLongitude { get; set; }
        public double ToLatitude { get; set; }
        public string FromCountry { get; set; }
        public string FromCity { get; set; }
        public string FromStreet { get; set; }
        public string FromNumber { get; set; }
        public string ToCountry { get; set; }
        public string ToCity { get; set; }
        public string ToStreet { get; set; }
        public string ToNumber { get; set; }
        public string RouteGeometry { get; set; }
        */
        public string DriverEmail { get; set; }
        public string DriverFirstName { get; set; }
        public string DriverLastName { get; set; }
        public string DriverPhone { get; set; }
        public DateTime RideDateTime { get; set; }
        public string NoteText { get; set; }
        public int DriverNoteId { get; set; }
        public List<RideRequestDto> Requests { get; set; }
        public List<PassengerDto> Passengers { get; set; }
        public int NumberOfSeats { get; set; }
        public bool isActive { get; set; }


    }
}
