package com.Community_cart.service;

import com.Community_cart.model.Order;
import com.Community_cart.model.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
