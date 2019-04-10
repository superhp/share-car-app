using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories.Notes_Repository;
using ShareCar.Dto;

namespace ShareCar.Logic.Note_Logic
{
    public class DriverNoteLogic : IDriverNoteLogic
    {
        private readonly IDriverNoteRepository _driverNoteRepository;
        private readonly IMapper _mapper;

        public DriverNoteLogic(IDriverNoteRepository driverNoteRepository, IMapper mapper)
        {
            _driverNoteRepository = driverNoteRepository;
            _mapper = mapper;
        }

        public List<DriverNoteDto> GetNotesByDriver(string email)
        {
            var driverNotes = _driverNoteRepository.GetNotesByDriver(email).ToList();
            return _mapper.Map<List<DriverNote>, List<DriverNoteDto>>(driverNotes);
        }

        public DriverNoteDto AddNote(DriverNoteDto note)
        {
            note.DriverSeenNotes = new List<DriverSeenNoteDto>();
            var entity = _driverNoteRepository.AddNote(_mapper.Map<DriverNoteDto, DriverNote>(note));
            return _mapper.Map<DriverNote, DriverNoteDto>(entity);
        }

        public void RemoveNote(int id)
        {
            _driverNoteRepository.RemoveNote(id);
        }

        public void UpdateNote(DriverNoteDto note)
        {
            if (note.DriverNoteId != 0)
            {
                _driverNoteRepository.UpdateNote(_mapper.Map<DriverNoteDto, DriverNote>(note));
            }
            else
            {
                _driverNoteRepository.AddNote(_mapper.Map<DriverNoteDto, DriverNote>(note));
            }
        }
    }
}
