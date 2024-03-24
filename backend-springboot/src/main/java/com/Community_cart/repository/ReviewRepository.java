package com.Community_cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Community_cart.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
