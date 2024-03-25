import React, { useState } from "react";
import { Drawer,Button, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Close, Menu } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Divider } from "@mui/material";

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
  const [openDrawer, setOpenDrawer] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const handleNavigate = (item) => {
    if (item.title.toLowerCase() === "account") {
      navigate(`/my-profile/`);
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
    setOpenDrawer(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      {!isSmallScreen &&
        productList.map((item, i) => (
          <Button
            key={i}
            onClick={() => handleNavigate(item)}
            startIcon={item.icon}
            sx={{
              fontWeight: location.pathname.includes(item.title.toLowerCase())
                ? "bold"
                : "normal",
            }}
          >
            {item.title}
          </Button>
        ))}
      {isSmallScreen && (
        <>
          <IconButton onClick={toggleDrawer} aria-label="open drawer"  sx={{ position: "absolute", right: 5 }}>
            <Menu />
          </IconButton>
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={toggleDrawer}
            variant="temporary"
            sx={{ zIndex: 1000 }}
          >
            <IconButton
                sx={{ position: "absolute", top: 5, right: 5 }}
                onClick={toggleDrawer}
              >
                <Close sx={{ zIndex: 1001 }}/>
              </IconButton>
            <div className="  flex flex-col justify-center text-xl space-y-8 pt-16">
              
            
              {productList.map((item, i) => (
            <>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== productList.length - 1 && <Divider />}
            </>
          ))}
            </div>
          </Drawer>
        </>
      )}
    </>
  );
};

export default ProfileNavigation;
