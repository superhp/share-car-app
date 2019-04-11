using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Db.Repositories.Notes_Repository
{
    public interface IRideRequestNoteRepository
    {
        RideRequestNote AddNote(RideRequestNote note);
        void UpdateNote(RideRequestNote note);
        RideRequestNote GetNoteByRide(int rideId);
        IEnumerable<RideRequestNote> GetNoteByPassenger(string email);
    }
}
