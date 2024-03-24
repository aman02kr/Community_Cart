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
import com.Community_cart.model.Category;
import com.Community_cart.model.Product;
import com.Community_cart.model.Shop;
import com.Community_cart.model.User;
import com.Community_cart.request.CreateProductRequest;
import com.Community_cart.service.CategoryService;
import com.Community_cart.service.ProductService;
import com.Community_cart.service.ShopService;
import com.Community_cart.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/admin/product")
public class AdminProductListItemController {
	
	@Autowired
	private ProductService productListItemService;
	@Autowired
	private UserService userService;
	@Autowired
	private ShopService shopService;
	@Autowired
	private CategoryService categoryService;

	@PostMapping()
	public ResponseEntity<Product> createItem(
			@RequestBody CreateProductRequest item, 
			@RequestHeader("Authorization") String jwt)
			throws ProductException, UserException, ShopException {
		System.out.println("req-controller ----"+item);
		User user = userService.findUserProfileByJwt(jwt);
//		Category category=categoryService.findCategoryById(item.getCategoryId());
		Shop shop=shopService.findShopById(item.getShopId());
			Product productListItem = productListItemService.createProduct(item,item.getCategory(),shop);
			return ResponseEntity.ok(productListItem);

	}


	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws UserException, ProductException {
		User user = userService.findUserProfileByJwt(jwt);
		
			productListItemService.deleteProduct(id);
			return ResponseEntity.ok("ProductList item deleted");
		
	
	}

	

	@GetMapping("/search")
	public ResponseEntity<List<Product>> getProductListItemByName(@RequestParam String name)  {
		List<Product> productListItem = productListItemService.searchProduct(name);
		return ResponseEntity.ok(productListItem);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Product> updateAvilibilityStatus(
			@PathVariable Long id) throws ProductException {
		Product productListItems= productListItemService.updateAvailibilityStatus(id);
		return ResponseEntity.ok(productListItems);
	}
	
	

}
