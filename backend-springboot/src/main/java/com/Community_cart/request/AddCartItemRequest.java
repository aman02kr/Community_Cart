package com.Community_cart.request;

import java.util.List;

import com.Community_cart.model.Product;

import lombok.Data;

@Data
public class AddCartItemRequest {
	
	private Long productListItemId;
	private int quantity;
	private List<String> ingredients;

}
