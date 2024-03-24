package com.Community_cart.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Community_cart.Exception.ShopException;
import com.Community_cart.dto.ShopDto;
import com.Community_cart.model.Address;
import com.Community_cart.model.Shop;
import com.Community_cart.model.User;
import com.Community_cart.repository.AddressRepository;
import com.Community_cart.repository.ShopRepository;
import com.Community_cart.repository.UserRepository;
import com.Community_cart.request.CreateShopRequest;

@Service
public class ShopServiceImplementation implements ShopService {
	@Autowired
	private ShopRepository shopRepository;
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	

	@Override
	public Shop createShop(CreateShopRequest req,User user) {
		Address address=new Address();
		address.setCity(req.getAddress().getCity());
		address.setCountry(req.getAddress().getCountry());
		address.setFullName(req.getAddress().getFullName());
		address.setPostalCode(req.getAddress().getPostalCode());
		address.setState(req.getAddress().getState());
		address.setStreetAddress(req.getAddress().getStreetAddress());
		address.setLatitude(req.getAddress().getLatitude());
		address.setLongitude(req.getAddress().getLongitude());

		Address savedAddress = addressRepository.save(address);
		
		Shop shop = new Shop();
		
		shop.setAddress(savedAddress);
		shop.setContactInformation(req.getContactInformation());
		shop.setShopType(req.getShopType());
		shop.setDescription(req.getDescription());
		shop.setImages(req.getImages());
		shop.setName(req.getName());
		shop.setOpeningHours(req.getOpeningHours());
		shop.setRegistrationDate(req.getRegistrationDate());
		shop.setOwner(user);
		Shop savedShop = shopRepository.save(shop);

		return savedShop;
	}

	@Override
	public Shop updateShop(Long shopId, CreateShopRequest updatedReq)
			throws ShopException {
		Shop shop = findShopById(shopId);
		if (shop.getShopType() != null) {
			shop.setShopType(updatedReq.getShopType());
		}
		if (shop.getDescription() != null) {
			shop.setDescription(updatedReq.getDescription());
		}
		return shopRepository.save(shop);
	}
	
	@Override
	public Shop findShopById(Long shopId) throws ShopException {
		Optional<Shop> shop = shopRepository.findById(shopId);
		if (shop.isPresent()) {
			return shop.get();
		} else {
			throw new ShopException("Shop with id " + shopId + "not found");
		}
	}

	@Override
	public void deleteShop(Long shopId) throws ShopException {
		Shop shop = findShopById(shopId);
		if (shop != null) {
			shopRepository.delete(shop);
			return;
		}
		throw new ShopException("Shop with id " + shopId + " Not found");

	}

	@Override
	public List<Shop> getAllShop() {
		return shopRepository.findAll();
	}


	@Override
	public Shop getShopsByUserId(Long userId) throws ShopException {
		Shop shops=shopRepository.findByOwnerId(userId);
		return shops;
	}



	@Override
	public List<Shop> searchShop(String keyword) {
		return shopRepository.findBySearchQuery(keyword);
	}

	@Override
	public ShopDto addToFavorites(Long shopId,User user) throws ShopException {
		Shop shop=findShopById(shopId);
		
		ShopDto dto=new ShopDto();
		dto.setTitle(shop.getName());
		dto.setImages(shop.getImages());
		dto.setId(shop.getId());
		dto.setDescription(shop.getDescription());

		boolean isFavorited = false;
		List<ShopDto> favorites = user.getFavorites();
		for (ShopDto favorite : favorites) {
			if (favorite.getId().equals(shopId)) {
				isFavorited = true;
				break;
			}
		}

		if (isFavorited) {
			favorites.removeIf(favorite -> favorite.getId().equals(shopId));
		} else {
			favorites.add(dto);
		}
		
		User updatedUser = userRepository.save(user);
		return dto;
	}

	@Override
	public Shop updateShopStatus(Long id) throws ShopException {
		Shop shop=findShopById(id);
		shop.setOpen(!shop.isOpen());
		return shopRepository.save(shop);
	}

}
