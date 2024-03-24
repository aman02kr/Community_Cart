package com.Community_cart.service;

import java.util.List;

import com.Community_cart.Exception.ProductException;
import com.Community_cart.Exception.ShopException;
import com.Community_cart.model.Category;
import com.Community_cart.model.Product;
import com.Community_cart.model.Shop;
import com.Community_cart.request.CreateProductRequest;

public interface ProductService {

	public Product createProduct(CreateProductRequest req,Category category,
						   Shop shop) throws ProductException, ShopException;

	void deleteProduct(Long productId) throws ProductException;
	
	public List<Product> getShopsProduct(Long shopId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String productCategory) throws ProductException;
	
	public List<Product> searchProduct(String keyword);
	
	public Product findProductById(Long productId) throws ProductException;

	public Product updateAvailibilityStatus(Long productId) throws ProductException;
}
