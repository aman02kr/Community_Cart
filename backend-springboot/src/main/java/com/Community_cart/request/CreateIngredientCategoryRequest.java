package com.Community_cart.request;

import lombok.Data;

@Data
public class CreateIngredientCategoryRequest {

    private Long shopId;
    private String name;
}
