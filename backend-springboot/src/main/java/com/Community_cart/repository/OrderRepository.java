package com.Community_cart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Community_cart.model.Order;
import com.Community_cart.model.User;

public interface OrderRepository extends JpaRepository<Order,Long> {
	@Query("SELECT o FROM Order o WHERE o.customer.id = :userId")
	List<Order> findAllUserOrders(@Param("userId")Long userId);
    
	@Query("SELECT o FROM Order o WHERE o.shop.id = :shopId")
	List<Order> findOrdersByShopId(@Param("shopId") Long shopId);
}
