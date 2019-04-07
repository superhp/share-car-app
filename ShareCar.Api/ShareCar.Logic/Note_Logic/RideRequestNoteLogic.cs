using AutoMapper;
using ShareCar.Db.Entities;
using ShareCar.Db.Repositories.Notes_Repository;
using ShareCar.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShareCar.Logic.Note_Logic
{
    public class RideRequestNoteLogic : IRideRequestNoteLogic
    {
        private readonly IRideRequestNoteRepository _rideRequestNoteRepository;
        private readonly IMapper _mapper;

        public RideRequestNoteLogic(IRideRequestNoteRepository rideRequestNoteRepository, IMapper mapper)
        {
            _rideRequestNoteRepository = rideRequestNoteRepository;
            _mapper = mapper;
        }

        public RideRequestNoteDto AddNote(RideRequestNoteDto note)
        {
            var entity = _rideRequestNoteRepository.AddNote(_mapper.Map<RideRequestNoteDto, RideRequestNote>(note));
            return _mapper.Map<RideRequestNote, RideRequestNoteDto>(entity);
        }

        public void RemoveNote(int id)
        {
            _rideRequestNoteRepository.RemoveNote(id);
        }

        public void UpdateNote(RideRequestNoteDto note)
        {
            if (note.RideRequestNoteId != 0)
            {
                _rideRequestNoteRepository.UpdateNote(_mapper.Map<RideRequestNoteDto, RideRequestNote>(note));
            }
            else
            {
                _rideRequestNoteRepository.AddNote(_mapper.Map<RideRequestNoteDto, RideRequestNote>(note));
            }
        }
    }
}
