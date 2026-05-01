package com.employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
@Component
public class EmployeeService {
@Autowired
private EmployeeRepository repository;
public void addEmployee(int id, String name) {repository.save(new Employee(id, name));}
public List<Employee> getAllEmployees() {return repository.findAll();}
}