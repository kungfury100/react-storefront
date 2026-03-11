package ee.karl.backend.controller;

import ee.karl.backend.entity.Order;
import ee.karl.backend.entity.OrderRow;
import ee.karl.backend.repository.OrderRepository;
import ee.karl.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;

    @GetMapping("orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @PostMapping("orders")
    public Order addOrder(@RequestBody List<OrderRow> orderRows) {
        Order order = new Order();
        order.setOrderRows(orderRows);
        order.setTotal(orderService.calculateOrderSum(orderRows));
        return orderRepository.save(order);
    }
}
