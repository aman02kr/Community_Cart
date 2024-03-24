import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminSidebar from "./AdminSidebar";
import ShopDashboard from "./Dashboard/ShopDashboard";
import ShopsOrder from "./Orders/ShopsOrder";
import ShopsProductList from "./Product/ShopsProductList";
import AddProductListForm from "./Product/AddProductListForm";
import CreateShopForm from "./AddShops/CreateShopForm";
import Category from "./Category/Category";
import { useDispatch, useSelector } from "react-redux";

import { getShopsCategory } from "../State/Customers/Shop/shop.action";
import Details from "./Details/Details";
import AdminNavbar from "./AdminNavbar";
import { getUsersOrders } from "../State/Customers/Orders/Action";
import { fetchShopsOrder } from "../State/Admin/Order/shops.order.action";

const Admin = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const { auth, shop, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (shop.usersShop) {
     
      dispatch(
        getShopsCategory({
          jwt: auth.jwt || jwt,
          shopId: shop.usersShop?.id,
        })
      );

      dispatch(
        fetchShopsOrder({
          shopId: shop.usersShop?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [shop.usersShop]);
  return (
    <div>
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:flex justify-between">
        <div className="">
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>

        <div className="lg:w-[80vw]">
          <Routes>
            <Route path="/" element={<ShopDashboard />} />
            <Route path="/orders" element={<ShopsOrder />} />
            <Route path="/productList" element={<ShopsProductList />} />
            <Route path="/add-productList" element={<AddProductListForm />} />
            <Route path="/add-shop" element={<CreateShopForm />} />
            <Route path="/category" element={<Category />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
