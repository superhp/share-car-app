package com.cognizant.sharecar.api.resource;

import com.cognizant.sharecar.api.model.Person;
import com.cognizant.sharecar.api.spi.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(path = "/person")
public class PersonApi {

    private final PersonService personService;

    public PersonApi(@Autowired PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping(method = GET, path = "/{personId}")
    public ResponseEntity<Person> getPerson(@PathVariable("personId") long personId) {
        return personService.getPerson(personId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(method = GET)
    public List<Person> getPeople() {
        return personService.getPeople();
    }

    @RequestMapping(method = POST)
    public long getPeople(@RequestBody Person person) {
        return personService.savePerson(person);
    }


}
