package com.Community_cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Community_cart.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
