import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { shopCategories } from "../../../Data/shopCategories";
import { PopularShops } from "./PopularShops";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchProductListItem } from "../../../State/Customers/ProductList/productList.action";

const dish = [1, 1, 1, 1];
const Search = () => {
  const dispatch = useDispatch();
  const { productList,auth } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")

  const handleSearchProductList = (keyword) => {
    dispatch(searchProductListItem({keyword,jwt:auth.jwt || jwt }));
  };
  
  return (
    <div className="px-5 lg:px-[18vw]">
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2" />
        <input
          onChange={(e) => handleSearchProductList(e.target.value)}
          className="p-2 py-3 pl-12 w-full border-2 border-gray-300 rounded-lg outline-none"
          type="text"
          placeholder="search items"
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Categories</h1>
        <div className="flex flex-wrap ">
          {shopCategories.slice(0, 9).map((item) => (
            <PopularShops image={item.image} title={item.title} />
          ))}
        </div>
      </div>
      <div className=" mt-7">
        {productList.search.map((item) => (
          <SearchDishCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default Search;
