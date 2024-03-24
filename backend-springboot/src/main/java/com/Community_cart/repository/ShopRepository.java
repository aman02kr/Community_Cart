package com.Community_cart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Community_cart.model.Shop;

public interface ShopRepository extends JpaRepository<Shop, Long> {

	@Query("SELECT r FROM Shop r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.shopType) LIKE lower(concat('%', :query, '%'))")
	List<Shop> findBySearchQuery(String query);

	Shop findByOwnerId(Long userId);



}
