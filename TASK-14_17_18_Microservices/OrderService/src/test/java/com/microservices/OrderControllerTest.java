package com.microservices;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(OrderController.class)
public class OrderControllerTest {
@Autowired private MockMvc mockMvc;
@MockBean private RestTemplate restTemplate;
@Test
public void testGetOrderWithProduct() throws Exception {
when(restTemplate.getForObject("http://product-service/api/products/123", String.class)).thenReturn("ProductDetails:123");
mockMvc.perform(get("/api/orders/123"))
.andExpect(status().isOk())
.andExpect(content().string("OrderForProduct[ProductDetails:123]"));
}
}