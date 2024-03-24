import React from "react";
import { Route, Routes } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSideBar";
import SuperAdminCustomerTable from "./SuperAdminCustomerTable/SuperAdminCustomerTable";
import Customers from "./SuperAdminCustomerTable/Customers";
import ShopTable from "./Shops/ShopTable";
import SuperAdminShop from "./Shops/SuperAdminShop";
import ShopRequest from "./ShopRequest/ShopRequest";
// import AdminDashboard from "./Dashboard/AdminDashboard";
// import AdminSidebar from "./AdminSidebar";
// import ShopDashboard from "./Dashboard/ShopDashboard";
// import ShopsOrder from "./Orders/ShopsOrder";
// import ShopsProductList from "./ProductListItem/ShopsProductList";
// import AddProductListForm from "./AddProductList/AddProductListForm";
// import CreateShopForm from "./AddShops/CreateShopForm";

const SuperAdmin = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="">
       
        <SuperAdminSidebar />
      </div>

      <div className="w-[80vw]">
        <Routes>
          <Route path="/customers" element={<Customers/>}></Route>
          <Route path="/shops" element={<SuperAdminShop/>}></Route>
          <Route path="/shop-request" element={<ShopRequest/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
