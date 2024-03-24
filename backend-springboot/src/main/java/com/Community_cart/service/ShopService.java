package com.Community_cart.service;

import java.util.List;

import com.Community_cart.Exception.ShopException;
import com.Community_cart.dto.ShopDto;
import com.Community_cart.model.Shop;
import com.Community_cart.model.User;
import com.Community_cart.request.CreateShopRequest;

public interface ShopService {

	public Shop createShop(CreateShopRequest req,User user);

	public Shop updateShop(Long shopId, CreateShopRequest updatedShop)
			throws ShopException;

	public void deleteShop(Long shopId) throws ShopException;

	public List<Shop>getAllShop();

	public List<Shop>searchShop(String keyword);
	
	public Shop findShopById(Long id) throws ShopException;

	public Shop getShopsByUserId(Long userId) throws ShopException;
	
	public ShopDto addToFavorites(Long shopId,User user) throws ShopException;

	public Shop updateShopStatus(Long id)throws ShopException;
}
