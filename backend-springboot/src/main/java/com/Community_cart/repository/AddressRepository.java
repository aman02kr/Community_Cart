package com.Community_cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Community_cart.model.Address;
import com.Community_cart.model.User;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
