package com.cognizant.sharecar.api.spi;

import com.cognizant.sharecar.api.model.EchoMessage;

public interface EchoService {

    EchoMessage echo(String echoMessage);
}
