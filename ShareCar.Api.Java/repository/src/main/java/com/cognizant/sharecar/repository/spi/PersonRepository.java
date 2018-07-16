package com.cognizant.sharecar.repository.spi;

import com.cognizant.sharecar.repository.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
