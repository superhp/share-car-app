package com.cognizant.sharecar.service;

import com.cognizant.sharecar.api.model.Person;
import com.cognizant.sharecar.api.spi.PersonService;
import com.cognizant.sharecar.repository.spi.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DefaultPersonService implements PersonService {

    private final PersonRepository repository;

    public DefaultPersonService(@Autowired PersonRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<Person> getPerson(long id) {
        return repository.findById(id).map(person -> new Person(person.getPersonId(), person.getName(), person.getSecondName()));
    }

    @Override
    public List<Person> getPeople() {
        return repository.findAll()
                .stream()
                .map(person -> new Person(person.getPersonId(), person.getName(), person.getSecondName()))
                .collect(Collectors.toList());
    }

    @Override
    public long savePerson(Person person) {
        final var newPerson = new com.cognizant.sharecar.repository.entity.Person(person.getName(), person.getSecondName());
        return repository.save(newPerson).getPersonId();
    }
}
