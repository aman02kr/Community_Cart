package com.Community_cart.service;

import java.util.List;

import com.Community_cart.model.Notification;
import com.Community_cart.model.Order;
import com.Community_cart.model.Shop;
import com.Community_cart.model.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendShopNotification(Shop shop, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}
