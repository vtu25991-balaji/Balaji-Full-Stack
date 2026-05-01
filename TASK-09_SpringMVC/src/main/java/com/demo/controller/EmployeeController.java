package com.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class EmployeeController {
@GetMapping("/details")
@ResponseBody
public String getEmployeeDetails() {return "<h3>Employee Details Flow (No XML)</h3><p>Name: John Smith<br/>Id: 101<br/>Dept: IT</p>";}
}