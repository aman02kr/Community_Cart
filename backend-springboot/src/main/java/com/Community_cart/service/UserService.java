package com.Community_cart.service;

import java.util.List;

import com.Community_cart.Exception.UserException;
import com.Community_cart.model.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public User findUserByEmail(String email) throws UserException;

	public List<User> findAllUsers();

	public List<User> getPenddingShopOwner();


	void updatePassword(User user, String newPassword);

	void sendPasswordResetEmail(User user);


}
