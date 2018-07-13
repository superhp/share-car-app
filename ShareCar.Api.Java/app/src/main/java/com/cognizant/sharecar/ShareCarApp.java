package com.cognizant.sharecar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.cognizant.sharecar"})
public class ShareCarApp {

    public static void main(String[] args) {
        SpringApplication.run(ShareCarApp.class, args);
    }
}
