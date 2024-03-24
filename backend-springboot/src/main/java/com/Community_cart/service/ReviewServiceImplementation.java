package com.Community_cart.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Community_cart.Exception.ReviewException;
import com.Community_cart.model.Shop;
import com.Community_cart.model.Review;
import com.Community_cart.model.User;
import com.Community_cart.repository.ShopRepository;
import com.Community_cart.repository.ReviewRepository;
import com.Community_cart.request.ReviewRequest;
@Service
public class ReviewServiceImplementation implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ShopRepository shopRepository;

   @Override
    public Review submitReview(ReviewRequest reviewRequest, User user) {
        Review review = new Review();
        System.out.println(reviewRequest);
        
        System.out.println(reviewRequest.getShopId());
         Optional<Shop> shop = shopRepository.findById(reviewRequest.getShopId());
         if(shop.isPresent()) {
        	 review.setShop(shop.get());
         }
         review.setShopIdd(reviewRequest.getShopId());
        review.setCustomer(user);
        review.setMessage(reviewRequest.getReviewText());
        review.setRating(reviewRequest.getRating());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    
    @Override
    public void deleteReview(Long reviewId) throws ReviewException {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {
            reviewRepository.deleteById(reviewId);
        } else {
            throw new ReviewException("Review with ID " + reviewId + " not found");
        }
    }

    @Override
    public double calculateAverageRating(List<Review> reviews) {
    	 double totalRating = 0;

         for (Review review : reviews) {
             totalRating += review.getRating();
         }

         if (reviews.size() > 0) {
             return totalRating / reviews.size();
         } else {
             return 0;
         }
    }
    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}

