package com.Community_cart.request;

import java.time.LocalDateTime;
import java.util.List;

import com.Community_cart.model.Address;
import com.Community_cart.model.ContactInformation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateShopRequest {

	private Long id;
	private String name;
	private String description;
	private String shopType;
	private Address address;
	private ContactInformation contactInformation;
	private String openingHours;
	private List<String> images;
    private LocalDateTime registrationDate;
}
