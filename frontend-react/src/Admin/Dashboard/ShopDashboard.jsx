import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductListItemsByShopId } from "../../State/Customers/ProductList/productList.action";
import { Grid } from "@mui/material";
import OrdersTable from "../Orders/OrderTable";
import ProductListItemTable from "../Product/ProductListItemTable";
import AvgCard from "../ReportCard/ReportCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SellIcon from "@mui/icons-material/Sell";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const ShopDashboard = () => {
  const { id } = useParams();
  const {shop}=useSelector(store=>store);
  console.log("shops id ", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductListItemsByShopId({
        shopId: id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  console.log("shop",shop)
  return (
    <div className="px-2">
      
      <Grid container spacing={1}>
        {/* <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Total Earnings"}
            value={`Rs. ${450}`}
            growValue={70}
            icon={
              <CurrencyRupeeIcon sx={{ fontSize: "3rem", color: "gold" }} />
            }
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Total Selles"}
            value={`${390}`}
            growValue={35}
            icon={<SellIcon sx={{ fontSize: "3rem", color: "green" }} />}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Sold Items"}
            value={`${299}`}
            growValue={30}
            icon={<FastproductIcon sx={{ fontSize: "3rem", color: "blue" }} />}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <AvgCard
            title={"Left Items"}
            value={`${1}`}
            growValue={10}
            icon={<FastproductIcon sx={{ fontSize: "3rem", color: "red" }} />
            
          }
          />
        </Grid> */}
        <Grid lg={6} xs={12} item>
          <OrdersTable name={"Recent Order"} isDashboard={true} />
        </Grid>
        <Grid lg={6} xs={12} item>
          <ProductListItemTable isDashboard={true} name={"Recently Added ProductList"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ShopDashboard;
