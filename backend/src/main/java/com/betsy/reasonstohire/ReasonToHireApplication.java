package com.betsy.reasonstohire;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(info = @Info(title = "Reasons to Hire Betsy API", version = "1.0", description = "API for managing reasons to hire Betsy", contact = @Contact(name = "Betsy", email = "betsy@example.com")))
@SpringBootApplication
public class ReasonToHireApplication {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        SpringApplication.run(ReasonToHireApplication.class, args);
    }
}
