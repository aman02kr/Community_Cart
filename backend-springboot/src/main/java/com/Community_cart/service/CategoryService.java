package com.Community_cart.service;

import java.util.List;

import com.Community_cart.Exception.ShopException;
import com.Community_cart.model.Category;

public interface CategoryService {
	
	public Category createCategory (String name,Long userId) throws ShopException;
	public List<Category> findCategoryByShopId(Long shopId) throws ShopException;
	public Category findCategoryById(Long id) throws ShopException;

}
