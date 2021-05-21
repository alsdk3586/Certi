package com.ssafy.certi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CertiApplication {

    public static void main(String[] args) {
        SpringApplication.run(CertiApplication.class, args);
    }

}