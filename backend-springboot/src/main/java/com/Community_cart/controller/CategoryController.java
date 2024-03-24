package com.Community_cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Community_cart.Exception.ShopException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Category;
import com.Community_cart.model.User;
import com.Community_cart.service.CategoryService;
import com.Community_cart.service.UserService;

@RestController
@RequestMapping("/api")
public class CategoryController {
	
	@Autowired
	public CategoryService categoryService;

	@Autowired
	public UserService userService;
	
	@PostMapping("/admin/category")
	public ResponseEntity<Category> createdCategory(
			@RequestHeader("Authorization")String jwt,
			@RequestBody Category category) throws ShopException, UserException {
		User user=userService.findUserProfileByJwt(jwt);
		
		Category createdCategory=categoryService.createCategory(category.getName(), user.getId());
		return new ResponseEntity<Category>(createdCategory,HttpStatus.OK);
	}
	
	@GetMapping("/category/shop/{id}")
	public ResponseEntity<List<Category>> getShopsCategory(
			@PathVariable Long id,
			@RequestHeader("Authorization")String jwt) throws ShopException, UserException {
		User user=userService.findUserProfileByJwt(jwt);
		List<Category> categories=categoryService.findCategoryByShopId(id);
		return new ResponseEntity<>(categories,HttpStatus.OK);
	}

}
