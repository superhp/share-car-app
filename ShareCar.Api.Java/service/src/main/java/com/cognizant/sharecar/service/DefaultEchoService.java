package com.cognizant.sharecar.service;

import com.cognizant.sharecar.api.model.EchoMessage;
import com.cognizant.sharecar.api.spi.EchoService;
import com.cognizant.sharecar.service.spi.EchoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DefaultEchoService implements EchoService {

    private EchoRepository echoRepository;

    @Autowired
    public DefaultEchoService(EchoRepository echoRepository) {
        this.echoRepository = echoRepository;
    }

    @Override
    public EchoMessage echo(String echoMessage) {
        EchoMessage echoMessageBody = new EchoMessage();
        echoMessageBody.getMessages().add(echoRepository.echo(echoMessage));
        echoMessageBody.getMessages().add("Echo message from Service: " + echoMessage);
        return echoMessageBody;
    }
}
