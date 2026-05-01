package com.demo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.data.domain.PageRequest;
@Component
public class Runner implements CommandLineRunner {
private final StudentRepository repo;
public Runner(StudentRepository r) {repo=r;}
@Override
public void run(String... args) throws Exception {
repo.save(new Student("Alice", "CS", 20));
repo.save(new Student("Bob", "IT", 22));
repo.save(new Student("Charlie", "CS", 23));
System.out.println("CS Students:");
repo.findByDepartment("CS").forEach(s -> System.out.println(s.getName()));
System.out.println("Students older than 21 (Paginated limit 1):");
repo.findByAgeGreaterThan(21, PageRequest.of(0, 1)).forEach(s -> System.out.println(s.getName()));
}
}