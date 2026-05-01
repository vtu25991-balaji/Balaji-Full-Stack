package com.microservices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
@RestController
@RequestMapping("/api/orders")
public class OrderController {
@Autowired private RestTemplate restTemplate;
@GetMapping("/{id}")
public String getOrderWithProduct(@PathVariable String id) {
String productInfo = restTemplate.getForObject("http://product-service/api/products/" + id, String.class);
return "OrderForProduct[" + productInfo + "]";
}
}