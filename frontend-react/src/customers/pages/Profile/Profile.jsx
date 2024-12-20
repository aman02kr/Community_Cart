import React from "react";
import { Divider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import Notifications from "./Notifications";
import OrderDetails from "../../components/Order/OrderDetail";
const Profile = () => {
  return (
    <div className="">
        <Routes>
        <Route path="/" element={<UserProfile/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/address" element={<UsersAddresses/>} />
          <Route path="/favorites" element={<Favorite/>} />
          <Route path="/payments" element={<Orders/>} />
          <Route path="/notification" element={<Notifications/>} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />

        </Routes>
       
     
    </div>
  );
};

export default Profile;
