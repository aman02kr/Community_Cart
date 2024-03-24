import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";

import darkTheme from "./theme/DarkTheme";
import Routers from "./Routers/Routers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Authentication/Action";
import { findCart } from "./State/Customers/Cart/cart.action";
import {
  getAllShopsAction,
  getShopById,
  getShopByUserId,
} from "./State/Customers/Shop/shop.action";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  
  useEffect(() => {
    
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(findCart(jwt));
      dispatch(getAllShopsAction(jwt));
    }
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user?.role == "ROLE_SHOP_OWNER") {
      dispatch(getShopByUserId(auth.jwt || jwt));
    }
  }, [auth.user]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
