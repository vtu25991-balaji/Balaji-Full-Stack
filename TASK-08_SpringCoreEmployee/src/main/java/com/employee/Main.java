package com.employee;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
public class Main {
public static void main(String[] args) {
BeanFactory factory = new AnnotationConfigApplicationContext(AppConfig.class);
EmployeeService service = factory.getBean(EmployeeService.class);
service.addEmployee(1, "Alice");
service.addEmployee(2, "Bob");
service.getAllEmployees().forEach(System.out::println);
}}