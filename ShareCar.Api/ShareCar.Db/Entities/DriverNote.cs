using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShareCar.Db.Entities
{
    public class DriverNote
    {
        public int DriverNoteId { get; set; }
        public string Text { get; set; }
        public List<DriverSeenNote> DriverSeenNotes { get; set; }
    }
}
