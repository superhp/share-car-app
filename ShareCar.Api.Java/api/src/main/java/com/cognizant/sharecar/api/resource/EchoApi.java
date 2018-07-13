package com.cognizant.sharecar.api.resource;

import com.cognizant.sharecar.api.model.EchoMessage;
import com.cognizant.sharecar.api.spi.EchoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class EchoApi {

    private final EchoService echoService;

    @Autowired
    public EchoApi(EchoService echoService) {
        this.echoService = echoService;
    }

    @RequestMapping(method = GET, path = "/echo/{echoMessage}")
    public EchoMessage echo(@PathVariable("echoMessage") String echo) {
        return echoService.echo(echo);
    }
}
