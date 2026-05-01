package com.employee;
import org.springframework.stereotype.Component;
import java.util.*;
@Component
public class EmployeeRepository {
private Map<Integer, Employee> storage = new HashMap<>();
public void save(Employee emp) {storage.put(emp.getId(), emp);}
public List<Employee> findAll() {return new ArrayList<>(storage.values());}
}