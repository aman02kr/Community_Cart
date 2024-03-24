package com.Community_cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Community_cart.Exception.ShopException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.dto.ShopDto;
import com.Community_cart.model.Shop;
import com.Community_cart.model.User;
import com.Community_cart.service.ShopService;
import com.Community_cart.service.UserService;

@RestController
@RequestMapping("/api/shops")
public class ShopController {
	
	@Autowired
	private ShopService shopService;
	
	@Autowired
	private UserService userService;


	@GetMapping("/search")
	public ResponseEntity<List<Shop>> findShopByName(
			@RequestParam String keyword) {
		List<Shop> shop = shopService.searchShop(keyword);

		return ResponseEntity.ok(shop);
	}


	@GetMapping()
	public ResponseEntity<List<Shop>> getAllShops() {

		List<Shop> shops = shopService.getAllShop();
		
		
		return ResponseEntity.ok(shops);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Shop> findShopById(
			@PathVariable Long id) throws ShopException {

			Shop shop = shopService.findShopById(id);
			return ResponseEntity.ok(shop);

	}
	
	@PutMapping("/{id}/add-favorites")
	public ResponseEntity<ShopDto> addToFavorite(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws ShopException, UserException {
		
			User user = userService.findUserProfileByJwt(jwt);
			ShopDto shop = shopService.addToFavorites(id, user);
			return ResponseEntity.ok(shop);

	}
	
	


}
