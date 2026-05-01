package com.microservices;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
@SpringBootApplication
public class OrderApp {
@Bean @LoadBalanced
public RestTemplate restTemplate() {return new RestTemplate();}
public static void main(String[] args) {SpringApplication.run(OrderApp.class, args);}
}