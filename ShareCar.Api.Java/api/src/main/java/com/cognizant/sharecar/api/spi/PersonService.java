package com.cognizant.sharecar.api.spi;

import com.cognizant.sharecar.api.model.Person;

import java.util.List;
import java.util.Optional;

public interface PersonService {

    Optional<Person> getPerson(long id);

    List<Person> getPeople();

    long savePerson(Person person);

}
