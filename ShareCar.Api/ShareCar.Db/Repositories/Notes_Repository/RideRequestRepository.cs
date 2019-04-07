using ShareCar.Db.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShareCar.Db.Repositories.Notes_Repository
{
    public class RideRequestRepository : IRideRequestNoteRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public RideRequestRepository(ApplicationDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public RideRequestNote AddNote(RideRequestNote note)
        {
            var entity = _databaseContext.Add(note).Entity;
            _databaseContext.SaveChanges();
            return entity;
        }

        public void RemoveNote(int id)
        {
            var note = _databaseContext.RideRequestNotes.Single(x => x.RideRequestNoteId == id);
            _databaseContext.Remove(note);
            _databaseContext.SaveChanges();
        }

        public void UpdateNote(RideRequestNote note)
        {
            var entity = _databaseContext.RideRequestNotes.Single(x => x.RideRequestNoteId == note.RideRequestNoteId);
            entity.Text = note.Text;
            _databaseContext.Update(entity);
            _databaseContext.SaveChanges();
        }
    }
}
