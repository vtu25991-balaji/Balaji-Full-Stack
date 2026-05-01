package com.demo;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
@Entity
public class Student {
@Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
private String name;
private String department;
private int age;
public Student() {}
public Student(String n, String d, int a) {name=n;department=d;age=a;}
public Long getId() {return id;}
public String getName() {return name;}
public String getDepartment() {return department;}
public int getAge() {return age;}
}