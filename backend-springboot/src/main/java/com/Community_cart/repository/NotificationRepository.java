package com.Community_cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Community_cart.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	public List<Notification> findByCustomerId(Long userId);
	public List<Notification> findByShopId(Long shopId);

}
