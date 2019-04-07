using ShareCar.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Note_Logic
{
    public interface IRideRequestNoteLogic
    {
        RideRequestNoteDto AddNote(RideRequestNoteDto note);
        void UpdateNote(RideRequestNoteDto note);
        void RemoveNote(int id);
    }
}
