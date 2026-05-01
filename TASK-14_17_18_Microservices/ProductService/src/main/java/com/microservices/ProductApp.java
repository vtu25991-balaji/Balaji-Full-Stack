package com.microservices;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
@SpringBootApplication
@RestController
@RequestMapping("/api/products")
public class ProductApp {
public static void main(String[] args) {SpringApplication.run(ProductApp.class, args);}
@GetMapping("/{id}")
public String getProduct(@PathVariable String id) {return "ProductDetails:" + id;}
}