package com.Community_cart.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Community_cart.Exception.CartException;
import com.Community_cart.Exception.OrderException;
import com.Community_cart.Exception.ShopException;
import com.Community_cart.Exception.UserException;
import com.Community_cart.model.Address;
import com.Community_cart.model.Cart;
import com.Community_cart.model.CartItem;
import com.Community_cart.model.Notification;
import com.Community_cart.model.Order;
import com.Community_cart.model.OrderItem;
import com.Community_cart.model.PaymentResponse;
import com.Community_cart.model.Shop;
import com.Community_cart.model.User;
import com.Community_cart.repository.AddressRepository;
import com.Community_cart.repository.CartRepository;
import com.Community_cart.repository.OrderItemRepository;
import com.Community_cart.repository.OrderRepository;
import com.Community_cart.repository.ShopRepository;
import com.Community_cart.repository.UserRepository;
import com.Community_cart.request.CreateOrderRequest;
import com.stripe.exception.StripeException;
@Service
public class OrderServiceImplementation implements OrderService {
	
	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private CartSerive cartService;
	@Autowired
	private OrderItemRepository orderItemRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ShopRepository shopRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PaymentService paymentSerive;
	
	@Autowired
	private NotificationService notificationService;
	

	

	@Override
	public PaymentResponse createOrder(CreateOrderRequest order,User user) throws UserException, ShopException, CartException, StripeException {
		
	    Address shippAddress = order.getDeliveryAddress();

	    
	    Address savedAddress = addressRepository.save(shippAddress);
	    
		boolean addressExists = false;
		for (Address userAddress : user.getAddresses()) {
			// Compare each attribute of the addresses
			if (areAddressesEqual(userAddress, savedAddress)) {
				addressExists = true;
				break;
			}
		}
	
		// If the address doesn't exist in the user's addresses, add it
		if (!addressExists) {
			user.getAddresses().add(savedAddress);
		}
	
		
		System.out.println("user addresses --------------  "+user.getAddresses());
		   
		 userRepository.save(user);
	    
	    Optional<Shop> shop = shopRepository.findById(order.getShopId());
	    if(shop.isEmpty()) {
	    	throw new ShopException("Shop not found with id "+order.getShopId());
	    }
	    
	    Order createdOrder = new Order();
	    
	    createdOrder.setCustomer(user);
	    createdOrder.setDeliveryAddress(savedAddress);
	    createdOrder.setCreatedAt(new Date());
	    createdOrder.setOrderStatus("PENDING");
	    createdOrder.setShop(shop.get());

        Cart cart = cartService.findCartByUserId(user.getId());
        
	    List<OrderItem> orderItems = new ArrayList<>();
	    
	    for (CartItem cartItem : cart.getItems()) {
	        OrderItem orderItem = new OrderItem();
	       orderItem.setProduct(cartItem.getProduct());
	       orderItem.setIngredients(cartItem.getIngredients());
	       orderItem.setQuantity(cartItem.getQuantity());
	        orderItem.setTotalPrice(cartItem.getProduct().getPrice()* cartItem.getQuantity());

	        OrderItem savedOrderItem = orderItemRepository.save(orderItem);
	        orderItems.add(savedOrderItem);
	    }
   
	     Long totalPrice = cartService.calculateCartTotals(cart);

	    createdOrder.setTotalAmount(totalPrice);
	    createdOrder.setShop(shop.get());
  
	    createdOrder.setItems(orderItems);
	    Order savedOrder = orderRepository.save(createdOrder);

	   shop.get().getOrders().add(savedOrder);
	   
	   shopRepository.save(shop.get());
	   

	   
	   PaymentResponse res=paymentSerive.generatePaymentLink(savedOrder);
	   return res;

	}

	@Override
	public void cancelOrder(Long orderId) throws OrderException {
           Order order =findOrderById(orderId);
           if(order==null) {
        	   throw new OrderException("Order not found with the id "+orderId);
           }
		
		    orderRepository.deleteById(orderId);
		
	}
	
	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order> order = orderRepository.findById(orderId);
		if(order.isPresent()) return order.get();
		
		throw new OrderException("Order not found with the id "+orderId);
	}

	@Override
	public List<Order> getUserOrders(Long userId) throws OrderException {
		List<Order> orders=orderRepository.findAllUserOrders(userId);
		return orders;
	} 

	@Override
	public List<Order> getOrdersOfShop(Long shopId,String orderStatus) throws OrderException, ShopException {
		
			List<Order> orders = orderRepository.findOrdersByShopId(shopId);
			
			if(orderStatus!=null) {
				orders = orders.stream()
						.filter(order->order.getOrderStatus().equals(orderStatus))
						.collect(Collectors.toList());
			}
			
			return orders;
	}
//    private List<ProductListItem> filterByVegetarian(List<ProductListItem> productListItems, boolean isVegetarian) {
//    return productListItems.stream()
//            .filter(productListItem -> productListItem.isVegetarian() == isVegetarian)
//            .collect(Collectors.toList());
//}
	
	

	@Override
	public Order updateOrder(Long orderId, String orderStatus) throws OrderException {
		Order order=findOrderById(orderId);
		
		System.out.println("--------- "+orderStatus);
		
		if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") 
				|| orderStatus.equals("COMPLETED") || orderStatus.equals("PENDING")) {
			order.setOrderStatus(orderStatus);
			Notification notification=notificationService.sendOrderStatusNotification(order);
			return orderRepository.save(order);
		}
		else throw new OrderException("Please Select A Valid Order Status");
		
		
	}
	
	private boolean areAddressesEqual(Address address1, Address address2) {
		return address1.getFullName().equals(address2.getFullName()) &&
			   address1.getStreetAddress().equals(address2.getStreetAddress()) &&
			   address1.getCity().equals(address2.getCity()) &&
			   address1.getState().equals(address2.getState()) &&
			   address1.getPostalCode().equals(address2.getPostalCode()) &&
			   address1.getCountry().equals(address2.getCountry());
	}
	

}
