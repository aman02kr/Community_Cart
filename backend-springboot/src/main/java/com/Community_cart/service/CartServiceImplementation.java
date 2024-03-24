package com.Community_cart.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Community_cart.Exception.CartException;
import com.Community_cart.Exception.CartItemException;
import com.Community_cart.Exception.ProductException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Cart;
import com.Community_cart.model.CartItem;
import com.Community_cart.model.Product;
import com.Community_cart.model.User;
import com.Community_cart.repository.CartItemRepository;
import com.Community_cart.repository.CartRepository;
import com.Community_cart.repository.productRepository;
import com.Community_cart.request.AddCartItemRequest;
import com.Community_cart.request.UpdateCartItemRequest;

@Service
public class CartServiceImplementation implements CartSerive {
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private productRepository productListItemRepository;

	@Override
	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, ProductException, CartException, CartItemException {

		User user = userService.findUserProfileByJwt(jwt);
		
		Optional<Product> productListItem=productListItemRepository.findById(req.getProductListItemId());
		if(productListItem.isEmpty()) {
			throw new ProductException("ProductList Item not exist with id "+req.getProductListItemId());
		}

		Cart cart = findCartByUserId(user.getId());

		for (CartItem cartItem : cart.getItems()) {
			if (cartItem.getProduct().equals(productListItem.get())) {

				int newQuantity = cartItem.getQuantity() + req.getQuantity();
				return updateCartItemQuantity(cartItem.getId(),newQuantity);
			}
		}

		CartItem newCartItem = new CartItem();
		newCartItem.setProduct(productListItem.get());
		newCartItem.setQuantity(req.getQuantity());
		newCartItem.setCart(cart);
		newCartItem.setIngredients(req.getIngredients());
		newCartItem.setTotalPrice(req.getQuantity()*productListItem.get().getPrice());
		
		CartItem savedItem=cartItemRepository.save(newCartItem);
		cart.getItems().add(savedItem);
		cartRepository.save(cart);
		
		return savedItem;

	}

	@Override
	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException {
		Optional<CartItem> cartItem=cartItemRepository.findById(cartItemId);
		if(cartItem.isEmpty()) {
			throw new CartItemException("cart item not exist with id "+cartItemId);
		}
		cartItem.get().setQuantity(quantity);
		cartItem.get().setTotalPrice((cartItem.get().getProduct().getPrice()*quantity));
		return cartItemRepository.save(cartItem.get());
	}

	@Override
	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, 
	CartException, CartItemException {

		User user = userService.findUserProfileByJwt(jwt);

		Cart cart = findCartByUserId(user.getId());
		
		Optional<CartItem> cartItem=cartItemRepository.findById(cartItemId);
		
		if(cartItem.isEmpty()) {
			throw new CartItemException("cart item not exist with id "+cartItemId);
		}

		cart.getItems().remove(cartItem.get());
		return cartRepository.save(cart);
	}

	@Override
	public Long calculateCartTotals(Cart cart) throws UserException {

		Long total = 0L;
		for (CartItem cartItem : cart.getItems()) {
			total += cartItem.getProduct().getPrice() * cartItem.getQuantity();
		}
		return total;
	}

	@Override
	public Cart findCartById(Long id) throws CartException {
		Optional<Cart> cart = cartRepository.findById(id);
		if(cart.isPresent()) {
			return cart.get();
		}
		throw new CartException("Cart not found with the id "+id);
	}

	@Override
	public Cart findCartByUserId(Long userId) throws CartException, UserException {
	
		Optional<Cart> opt=cartRepository.findByCustomer_Id(userId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new CartException("cart not found");
		
	}

	@Override
	public Cart clearCart(Long userId) throws CartException, UserException {
		Cart cart=findCartByUserId(userId);
		
		cart.getItems().clear();
		return cartRepository.save(cart);
	}

	

}
