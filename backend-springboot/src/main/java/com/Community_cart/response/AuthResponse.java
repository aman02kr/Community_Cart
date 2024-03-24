package com.Community_cart.response;


import com.Community_cart.domain.USER_ROLE;

import lombok.Data;

@Data
public class AuthResponse {
	
	private String message;
	private String jwt;
	private USER_ROLE role;
	


}
