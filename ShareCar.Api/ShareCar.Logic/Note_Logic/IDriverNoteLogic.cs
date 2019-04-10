﻿using ShareCar.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Note_Logic
{
    public interface IDriverNoteLogic
    {
        List<DriverNoteDto> GetNotesByDriver(string email);
        DriverNoteDto AddNote(DriverNoteDto note);
        void UpdateNote(DriverNoteDto note);
        void RemoveNote(int id);
    }
}
