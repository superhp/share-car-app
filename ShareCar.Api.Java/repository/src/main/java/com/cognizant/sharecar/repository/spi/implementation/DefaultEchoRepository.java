package com.cognizant.sharecar.repository.spi.implementation;

import com.cognizant.sharecar.repository.spi.EchoRepository;
import org.springframework.stereotype.Repository;

@Repository
public class DefaultEchoRepository implements EchoRepository {

    @Override
    public String echo(String echo) {
        return "Echo message from Repository: " + echo;
    }
}
