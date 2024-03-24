package com.Community_cart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Community_cart.model.Category;
import com.Community_cart.model.Product;

public interface productRepository extends JpaRepository<Product, Long> {

	
	List<Product> findByShopId(Long shopId);
	
	@Query("SELECT f FROM Product f WHERE "
			+ "f.name LIKE %:keyword% OR "
			+ "f.productCategory.name LIKE %:keyword% AND "
			+ "f.shop!=null"
	)
	List<Product> searchByNameOrCategory(@Param("keyword") String keyword);


	

}
