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
import org.springframework.web.bind.annotation.RestController;

import com.Community_cart.Exception.ShopException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Shop;
import com.Community_cart.model.User;
import com.Community_cart.request.CreateShopRequest;
import com.Community_cart.response.ApiResponse;
import com.Community_cart.service.ShopService;
import com.Community_cart.service.UserService;

@RestController
@RequestMapping("/api/admin/shops")
public class AdminShopController {
	@Autowired
	private ShopService shopService;
	
	@Autowired
	private UserService userService;

	@PostMapping()
	public ResponseEntity<Shop> createShop(
			@RequestBody CreateShopRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException {

			User user = userService.findUserProfileByJwt(jwt);
		
			System.out.println("----TRUE___-----"+jwt);
			Shop shop = shopService.createShop(req,user);
			return ResponseEntity.ok(shop);
	}


	@PutMapping("/{id}")
	public ResponseEntity<Shop> updateShop(@PathVariable Long id, @RequestBody CreateShopRequest req,
			@RequestHeader("Authorization") String jwt) throws ShopException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		
			Shop shop = shopService.updateShop(id, req);
			return ResponseEntity.ok(shop);
		
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteShopById(@PathVariable("id") Long shopId,
			@RequestHeader("Authorization") String jwt) throws ShopException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		
			shopService.deleteShop(shopId);
			
			ApiResponse res=new ApiResponse("Shop Deleted with id Successfully",true);
			return ResponseEntity.ok(res);
	}

	
	@PutMapping("/{id}/status")
	public ResponseEntity<Shop> updateStataurantStatus(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws ShopException, UserException {
		
			Shop shop = shopService.updateShopStatus(id);
			return ResponseEntity.ok(shop);

	}

	@GetMapping("/user")
	public ResponseEntity<Shop> findShopByUserId(
			@RequestHeader("Authorization") String jwt) throws ShopException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		Shop shop = shopService.getShopsByUserId(user.getId());
		return ResponseEntity.ok(shop);

	}
	
	

}
