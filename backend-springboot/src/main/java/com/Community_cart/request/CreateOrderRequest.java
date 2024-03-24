package com.Community_cart.request;

import com.Community_cart.model.Address;

import lombok.Data;

@Data
public class CreateOrderRequest {
 
	private Long shopId;
	
	private Address deliveryAddress;
	
    
}
