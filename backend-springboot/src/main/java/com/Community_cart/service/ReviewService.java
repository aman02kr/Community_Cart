package com.Community_cart.service;

import java.util.List;

import com.Community_cart.Exception.ReviewException;
import com.Community_cart.model.Review;
import com.Community_cart.model.User;
import com.Community_cart.request.ReviewRequest;

public interface ReviewService {
	
    public Review submitReview(ReviewRequest review,User user);
    public void deleteReview(Long reviewId) throws ReviewException;
    public double calculateAverageRating(List<Review> reviews);
    public List<Review> getAllReviews();
}
