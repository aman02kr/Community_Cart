package com.Community_cart.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Community_cart.Exception.ShopException;
import com.Community_cart.model.Category;
import com.Community_cart.model.Shop;
import com.Community_cart.repository.CategoryRepository;

@Service
public class CategoryServiceImplementation implements CategoryService {
	
	@Autowired
	private ShopService shopService;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category createCategory(String name,Long userId) throws ShopException {
		Shop shop=shopService.getShopsByUserId(userId);
		Category createdCategory=new Category();
		
		createdCategory.setName(name);
		createdCategory.setShop(shop);
		return categoryRepository.save(createdCategory);
	}

	@Override
	public List<Category> findCategoryByShopId(Long id) throws ShopException {
		Shop shop=shopService.findShopById(id);
		return categoryRepository.findByShopId(id);
	}

	@Override
	public Category findCategoryById(Long id) throws ShopException {
		Optional<Category> opt=categoryRepository.findById(id);
		
		if(opt.isEmpty()) {
			throw new ShopException("category not exist with id "+id);
		}
		
		return opt.get();
	}

}
