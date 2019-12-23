package com.cgcg.eis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.cgcg.**.repository")
@SpringBootApplication
public class EisWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(EisWebApplication.class, args);
    }
}
