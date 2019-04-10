using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ShareCar.Db.Entities;

namespace ShareCar.Db.Repositories.Notes_Repository
{
    public class DriverNoteRepository : IDriverNoteRepository
    {
        private readonly ApplicationDbContext _databaseContext;

        public DriverNoteRepository(ApplicationDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public DriverNote AddNote(DriverNote note)
        {
            var entity = _databaseContext.Add(note).Entity;
            _databaseContext.SaveChanges();
            return entity;
        }

        public IEnumerable<DriverNote> GetNotesByDriver(string email)
        {
            return _databaseContext.DriverNotes.Include(x => x.Ride).Where(x => x.Ride.DriverEmail == email);
        }

        public void RemoveNote(int id)
        {
            var note = _databaseContext.DriverNotes.Single(x => x.DriverNoteId == id);
            _databaseContext.Remove(note);
            _databaseContext.SaveChanges();
        }

        public void UpdateNote(DriverNote note)
        {
            var entity = _databaseContext.DriverNotes.Single(x => x.DriverNoteId == note.DriverNoteId);
            entity.Text = note.Text;
            _databaseContext.Update(entity);
            _databaseContext.SaveChanges();
        }
    }
}
