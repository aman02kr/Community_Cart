import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ProductListItemCard.css"; // Import the CSS file

const ProductListItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = (e) => {
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        productListItemId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(data));
  };

  return (
    <div className="productList-item-card"> {/* Apply custom class for styling */}
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="productList-item-info">
            <img className="productList-item-image" src={item.images[0]} alt="" />
            <div className="productList-item-details">
              <p className="productList-item-name">{item.name}</p>
              <p className="productList-item-price">₹{item.price}</p>
              <p className="productList-item-description">{item.description}</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className="add-to-cart-button">
              <Button variant="contained" disabled={!item.available} type="submit">
                {item.available ? "Add To Cart" : "Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductListItemCard;
