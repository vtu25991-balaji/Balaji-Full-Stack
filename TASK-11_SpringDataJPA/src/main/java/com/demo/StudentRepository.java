package com.demo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.domain.Pageable;
public interface StudentRepository extends JpaRepository<Student, Long> {
List<Student> findByDepartment(String department);
List<Student> findByAgeGreaterThan(int age, Pageable pageable);
}