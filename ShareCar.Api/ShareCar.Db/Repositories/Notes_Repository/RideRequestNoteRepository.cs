using Microsoft.EntityFrameworkCore;
using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShareCar.Db.Repositories.Notes_Repository
{
    public class RideRequestNoteRepository : IRideRequestNoteRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public RideRequestNoteRepository(ApplicationDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public RideRequestNote AddNote(RideRequestNote note)
        {
            var entity = _databaseContext.Add(note).Entity;
            _databaseContext.SaveChanges();
            return entity;
        }

        public IEnumerable<RideRequestNote> GetNoteByPassenger(string email)
        {
            return _databaseContext.RideRequestNotes.Include(x => x.RideRequest).Where(x => x.RideRequest.PassengerEmail == email);
        }

        public RideRequestNote GetNoteByRide(int rideId)
        {
           return _databaseContext.RideRequestNotes.Include(x => x.RideRequest).FirstOrDefault(x => x.RideRequest.RideId == rideId);
        }

        public RideRequestNote GetNoteByRideRequest(int rideRequestId)
        {
            return _databaseContext.RideRequestNotes.FirstOrDefault(x => x.RideRequestId == rideRequestId);
        }

        public void UpdateNote(RideRequestNote note)
        {
            var entity = _databaseContext.RideRequestNotes.Include(x => x.RideRequest).Single(x => x.RideRequest.RideRequestId == note.RideRequestId);

            entity.Text = note.Text;
            _databaseContext.Update(entity);
            _databaseContext.SaveChanges();
        }
    }
}
