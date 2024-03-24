package com.Community_cart.service;

import com.Community_cart.Exception.CartException;
import com.Community_cart.Exception.CartItemException;
import com.Community_cart.Exception.ProductException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Cart;
import com.Community_cart.model.CartItem;
import com.Community_cart.model.Product;
import com.Community_cart.model.User;
import com.Community_cart.request.AddCartItemRequest;
import com.Community_cart.request.UpdateCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, ProductException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
