package com.Community_cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Community_cart.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


//    CartItem findByProductIsContaining

}
