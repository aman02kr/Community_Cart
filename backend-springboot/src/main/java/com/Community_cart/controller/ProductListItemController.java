package com.Community_cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Community_cart.Exception.ProductException;
import com.Community_cart.Exception.ShopException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Product;
import com.Community_cart.model.User;
import com.Community_cart.request.CreateProductRequest;
import com.Community_cart.service.ProductService;
import com.Community_cart.service.UserService;

@RestController
@RequestMapping("/api/product")
public class ProductListItemController {
	@Autowired
	private ProductService productListItemService;
	
	@Autowired
	private UserService userService;


	@GetMapping("/search")
	public ResponseEntity<List<Product>> searchProduct(
			@RequestParam String name)  {
		List<Product> productListItem = productListItemService.searchProduct(name);
		return ResponseEntity.ok(productListItem);
	}
	@GetMapping("/shop/{shopId}")
	public ResponseEntity<List<Product>> getProductListItemByShopId(
			@PathVariable Long shopId,
			@RequestParam boolean vegetarian,
			@RequestParam boolean seasonal,
			@RequestParam boolean nonveg,
			@RequestParam(required = false) String product_category) throws ProductException {
		List<Product> productListItems= productListItemService.getShopsProduct(
				shopId,vegetarian,nonveg,seasonal,product_category);
		return ResponseEntity.ok(productListItems);
	}
	


}
