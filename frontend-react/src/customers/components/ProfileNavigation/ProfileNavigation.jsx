import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const productList = [
  { title: "Orders", icon: <ShoppingBagIcon color="black" /> },
  { title: "Favorites", icon: <FavoriteIcon color="black" /> },
  { title: "Address", icon: <HomeIcon color="black" /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon color="black" /> },
  { title: "Notification", icon: <NotificationsIcon color="black" /> },
  { title: "Account", icon: <AccountCircleIcon color="black" /> },
];

const ProfileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (item) => {
    if(item.title.toLowerCase()=="account"){
      navigate(`/my-profile/`);
    }
    else{
    navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
  
  };

  return (
    
     
      <Tabs
        value={false}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="secondary"
        sx={{ width: "100%" }}
      >
        {productList.map((item, i) => (
          <Tab
            key={i}
            label={item.title}
            icon={item.icon}
            onClick={() => handleNavigate(item)}
            sx={{
              fontWeight: location.pathname.includes(item.title.toLowerCase()) ? "bold" : "normal",
              "&.Mui-selected": {
                fontWeight: "bold",
                "& svg": {
                  color: "#7132F9",
                },
              },
            }}
          />
        ))}
      </Tabs>
     
  );
};

export default ProfileNavigation;
