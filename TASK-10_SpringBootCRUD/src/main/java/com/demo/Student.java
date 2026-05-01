package com.demo;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
@Entity
@Table(name="students")
public class Student {
@Id @Column(name="student_id")
private Long id;
@Column(name="student_name")
private String name;
public Long getId() {return id;}
public void setId(Long id) {this.id=id;}
public String getName() {return name;}
public void setName(String name) {this.name=name;}
}