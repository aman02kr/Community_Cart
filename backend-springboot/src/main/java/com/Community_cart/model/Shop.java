package com.Community_cart.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    private User owner;
    
    private String name;
    private String description;
    private String shopType;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;
    
    @Embedded
    private ContactInformation contactInformation;
    
    private String openingHours;
    
   
    @OneToMany(mappedBy = "shop",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Review>reviews=new ArrayList<>();
    
    @JsonIgnore
    @OneToMany(mappedBy="shop",cascade=CascadeType.ALL,orphanRemoval = true)
    private List<Order> orders=new ArrayList<>();
    
    private int numRating;

    @ElementCollection
    @Column(length = 1000)
    private List<String> images;
   
    private LocalDateTime registrationDate;
    
    private boolean open;

    @JsonIgnore
    @OneToMany(mappedBy = "shop",cascade = CascadeType.ALL)
    private List<Product> products=new ArrayList<>();
    
    
}

