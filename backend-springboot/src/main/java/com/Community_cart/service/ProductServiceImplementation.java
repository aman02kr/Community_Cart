package com.Community_cart.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Community_cart.Exception.ProductException;
import com.Community_cart.Exception.ShopException;
import com.Community_cart.model.Category;
import com.Community_cart.model.Product;
import com.Community_cart.model.Shop;
import com.Community_cart.repository.ShopRepository;
import com.Community_cart.repository.productRepository;
import com.Community_cart.request.CreateProductRequest;


@Service
public class ProductServiceImplementation implements ProductService {
	@Autowired
	private productRepository productRepository;
	

	
//	@Autowired
//	private ShopRepository shopRepository;


	

	@Override
	public Product createProduct(CreateProductRequest  req,
						   Category category,
						   Shop shop)
			throws ProductException,
	ShopException {

			Product product=new Product();
			product.setProductCategory(category);
			product.setCreationDate(new Date());
			product.setDescription(req.getDescription());
			product.setImages(req.getImages());
			product.setName(req.getName());
			product.setPrice((long) req.getPrice());
			product.setSeasonal(req.isSeasonal());		
			product.setVegetarian(req.isVegetarian());
		product.setShop(shop);
			product = productRepository.save(product);

			shop.getProducts().add(product);
			return product;
		
	}

	@Override
	public void deleteProduct(Long productId) throws ProductException {
		Product product=findProductById(productId);
		product.setShop(null);;
//		productRepository.save(product);
		productRepository.delete(product);

	}


	@Override
	public List<Product> getShopsProduct(
			Long shopId, 
			boolean isVegetarian, 
			boolean isNonveg,
			boolean isSeasonal,
			String productCategory) throws ProductException {
		List<Product> products = productRepository.findByShopId(shopId);
		
		
		
	    if (isVegetarian) {
	        products = filterByVegetarian(products, isVegetarian);
	    }
	    if (isNonveg) {
	        products = filterByNonveg(products, isNonveg);
	    }

	    if (isSeasonal) {
	        products = filterBySeasonal(products, isSeasonal);
	    }
	    if(productCategory!=null && !productCategory.equals("")) {
	    	products = filterByProductCategory(products, productCategory);
	    }
		
		return products;
		
	}
	
	private List<Product> filterByVegetarian(List<Product> products, boolean isVegetarian) {
	    return products.stream()
	            .filter(product -> product.isVegetarian() == isVegetarian)
	            .collect(Collectors.toList());
	}
	private List<Product> filterByNonveg(List<Product> products, boolean isNonveg) {
	    return products.stream()
	            .filter(product -> product.isVegetarian() == false)
	            .collect(Collectors.toList());
	}
	private List<Product> filterBySeasonal(List<Product> products, boolean isSeasonal) {
	    return products.stream()
	            .filter(product -> product.isSeasonal() == isSeasonal)
	            .collect(Collectors.toList());
	}
	private List<Product> filterByProductCategory(List<Product> products, String productCategory) {
	    
		return products.stream()
			    .filter(product -> {
			        if (product.getProductCategory() != null) {
			            return product.getProductCategory().getName().equals(productCategory);
			        }
			        return false; // Return true if product category is null
			    })
			    .collect(Collectors.toList());
	}

	@Override
	public List<Product> searchProduct(String keyword) {
		List<Product> items=new ArrayList<>();
		
		if(keyword!="") {
			System.out.println("keyword -- "+keyword);
			items=productRepository.searchByNameOrCategory(keyword);
		}
		
		return items;
	}

	@Override
	public Product updateAvailibilityStatus(Long id) throws ProductException {
		Product product = findProductById(id);
		
		product.setAvailable(!product.isAvailable());
		productRepository.save(product);
		return product;
	}

	@Override
	public Product findProductById(Long productId) throws ProductException {
		Optional<Product> product = productRepository.findById(productId);
		if (product.isPresent()) {
			return product.get();
		}
		throw new ProductException("product with id" + productId + "not found");
	}

}
