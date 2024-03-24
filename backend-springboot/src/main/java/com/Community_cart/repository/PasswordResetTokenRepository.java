package com.Community_cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Community_cart.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
