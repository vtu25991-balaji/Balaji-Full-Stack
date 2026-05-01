package com.demo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
public class Product {
private Long id;
@NotBlank(message = "Name is mandatory")
private String name;
@Positive(message = "Price must be greater than zero")
private double price;
public Product(Long i, String n, double p) {id=i;name=n;price=p;}
public Long getId() {return id;}
public String getName() {return name;}
public double getPrice() {return price;}
public void setId(Long i) {id=i;}
public void setName(String n) {name=n;}
public void setPrice(double p) {price=p;}
}