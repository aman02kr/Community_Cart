package com.Community_cart.request;



import java.util.List;

import com.Community_cart.model.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {
	

    
    private String name;
    private String description;
    private Long price;
    
  
    private Category category;
    private List<String> images;

   
    private Long shopId;
    
    private boolean vegetarian;
    private boolean seasonal;
    
    
	

}
