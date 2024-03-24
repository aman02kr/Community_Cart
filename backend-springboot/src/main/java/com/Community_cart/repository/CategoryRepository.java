package com.Community_cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Community_cart.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	public List<Category> findByShopId(Long id);
}
