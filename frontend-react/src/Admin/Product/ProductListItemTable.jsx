import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAction,
  getProductListItemsByShopId,
  updateProductListItemsAvailability,
} from "../../State/Customers/ProductList/productList.action";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create, Remove } from "@mui/icons-material";

const ProductListItemTable = ({ isDashboard, name }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, ingredients, shop,auth } = useSelector((store) => store);
  const { id } = useParams();
  const jwt=localStorage.getItem("jwt");

  useEffect(() => {
    
      if(shop.usersShop){
       dispatch( getProductListItemsByShopId({
        shopId: shop.usersShop?.id,
        jwt: localStorage.getItem("jwt"),
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        productCategory: "",
      }));
      }
      
    
  }, [shop.usersShop]);

  // console.log(
  //   "-------- ",
  //   productList.productListItems[1].ingredients,
  //   categorizedIngredients(productList.productListItems[1].ingredients)
  // );

  

  const handleProductAvialability = (productId) => {
    dispatch(updateProductListItemsAvailability({productId,jwt:auth.jwt || jwt}));
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductAction({productId,jwt:auth.jwt || jwt}));
  };

  return (
    <Box width={"100%"}>
      <Card className="mt-1">
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <IconButton onClick={() => navigate("/admin/shop/add-productList")}>
              <Create />
            </IconButton>
          }
        />
        <TableContainer>
          <Table aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Category</TableCell> */}
                
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell> */}

                <TableCell sx={{ textAlign: "center" }}>Availabilty</TableCell>
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.productListItems?.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.name} src={item.images[0]} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>

            
                  <TableCell sx={{ textAlign: "center" }}>
                    ₹{item.price}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      color={item.available ? "success" : "error"}
                      variant="text"
                      onClick={() => handleProductAvialability(item.id)}
                    >
                      {item.available ? "in stock" : "out of stock"}
                    </Button>
                  </TableCell>

                  {!isDashboard && (
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => handleDeleteProduct(item.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={productList.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ProductListItemTable;
