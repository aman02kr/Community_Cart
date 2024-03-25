import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Divider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import Notifications from "./Notifications";

const Profile = () => {
  return (
    <div className="">
      <div className="flex justify-center">
     <ProfileNavigation />
    </div>
      {/* <Divider orientation="vertical" flexItem /> */}
      <div className="">
        <Routes>
        <Route path="/" element={<UserProfile/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/address" element={<UsersAddresses/>} />
          <Route path="/favorites" element={<Favorite/>} />
          <Route path="/payments" element={<Orders/>} />
          <Route path="/notification" element={<Notifications/>} />
        </Routes>
       
      </div>
     
    </div>
  );
};

export default Profile;
