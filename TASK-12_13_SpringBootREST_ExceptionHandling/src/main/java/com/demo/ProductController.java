package com.demo;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.*;
@RestController
@RequestMapping("/api/products")
public class ProductController {
private List<Product> products = new ArrayList<>();
@GetMapping
public List<Product> getAll() {return products;}
@PostMapping
public Product create(@Valid @RequestBody Product p) {p.setId((long)(products.size()+1)); products.add(p); return p;}
@GetMapping("/{id}")
public Product getById(@PathVariable Long id) {
return products.stream().filter(p -> p.getId().equals(id)).findFirst().orElseThrow(() -> new RuntimeException("Product not found"));
}
}