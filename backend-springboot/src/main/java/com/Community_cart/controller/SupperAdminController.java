package com.Community_cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Community_cart.model.User;
import com.Community_cart.repository.UserRepository;
import com.Community_cart.service.UserService;

@RestController
public class SupperAdminController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/api/customers")
	public ResponseEntity<List<User>> getAllCustomers() {
		
		List<User> users =userService.findAllUsers();
		
		return new ResponseEntity<>(users,HttpStatus.ACCEPTED);

	}
	
	@GetMapping("/api/pending-customers")
	public ResponseEntity<List<User>> getPenddingShopUser(){
		List<User> users=userService.getPenddingShopOwner();
		return new ResponseEntity<List<User>>(users,HttpStatus.ACCEPTED);
		
	}
}
