package com.Community_cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Community_cart.Exception.CartException;
import com.Community_cart.Exception.OrderException;
import com.Community_cart.Exception.ShopException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Order;
import com.Community_cart.model.PaymentResponse;
import com.Community_cart.model.User;
import com.Community_cart.request.CreateOrderRequest;
import com.Community_cart.service.OrderService;
import com.Community_cart.service.UserService;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping("/api")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	
    @PostMapping("/order")
	public ResponseEntity<PaymentResponse>  createOrder(@RequestBody CreateOrderRequest order,
			@RequestHeader("Authorization") String jwt) 
					throws UserException, ShopException, 
					CartException, 
					StripeException,
					OrderException{
		User user=userService.findUserProfileByJwt(jwt);
		System.out.println("req user "+user.getEmail());
    	if(order!=null) {
			PaymentResponse res = orderService.createOrder(order,user);
			return ResponseEntity.ok(res);
			
    	}else throw new OrderException("Please provide valid request body");
		
    }
    
 
    
    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getAllUserOrders(	@RequestHeader("Authorization") String jwt) throws OrderException, UserException{
    
    	User user=userService.findUserProfileByJwt(jwt);
    	
    	if(user.getId()!=null) {
    	List<Order> userOrders = orderService.getUserOrders(user.getId());
    	return ResponseEntity.ok(userOrders);
    	}else {
    		return new ResponseEntity<List<Order>>(HttpStatus.BAD_REQUEST);
    	}
    }
    

    

	
}
