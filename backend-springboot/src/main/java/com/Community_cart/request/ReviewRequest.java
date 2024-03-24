package com.Community_cart.request;

import lombok.Data;

@Data
public class ReviewRequest {

    private Long shopId;
    
    private double rating;
    
    private String reviewText;

	
}
