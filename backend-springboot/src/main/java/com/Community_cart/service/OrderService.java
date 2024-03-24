package com.Community_cart.service;

import java.util.List;

import com.Community_cart.Exception.CartException;
import com.Community_cart.Exception.OrderException;
import com.Community_cart.Exception.ShopException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Order;
import com.Community_cart.model.PaymentResponse;
import com.Community_cart.model.User;
import com.Community_cart.request.CreateOrderRequest;
import com.stripe.exception.StripeException;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, ShopException, CartException, StripeException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfShop(Long shopId,String orderStatus) throws OrderException, ShopException;
	 

}
