import React, { useEffect, useState } from "react";
import "./Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Logo from './Logo.png';
import Alternatelogo  from './Alternatelogo.png';
import LocationComponent from "../Geolocation/findLocation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from '@mui/icons-material/Place';
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import { pink } from "@mui/material/colors";
import { 
  AccountCircle as AccountCircleIcon,
  ShoppingCart as ShoppingCartOutlinedIcon,
  Room as RoomIcon,
  Favorite as FavoriteIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToProfile = () => {
    navigate("/my-profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
    navigate("/");

  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#7132F9]  lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div
          onClick={() => navigate("/")}
          className="lg:mr-10 cursor-pointer flex items-center space-x-4"
        >
 {screenWidth < 600 ? (
        <img src={Alternatelogo} style={{ width: "50px", height: "25px" }} alt="Alternate Logo" />
      ) : (
        <img src={Logo} style={{ width: "150px", height: "25px" }} alt="Logo" />
      )}          <LocationComponent/>
        </div>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          {auth.user ? (
              <span
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-productList" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={
                auth.user?.role === "ROLE_CUSTOMER"
                  ? handleOpenMenu
                  : navigateToProfile
              }
              className=" font-semibold cursor-pointer"
            >
              <Avatar sx={{ bgcolor: "white",color:pink.A400}} className="bg-white">
                {auth.user.fullName[0].toUpperCase()}
              </Avatar>
            </span>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
          <Menu
            id="basic-productList"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={navigateToProfile}>
              <AccountCircleIcon />&nbsp;Profile
            </MenuItem>
            <MenuItem onClick={() => navigate("/my-profile/orders")}>
              <ShoppingCartOutlinedIcon /> &nbsp;Orders
            </MenuItem>
            <MenuItem onClick={() => navigate("/my-profile/address")}>
              <RoomIcon /> &nbsp;Address
            </MenuItem>
            <MenuItem onClick={() => navigate("/my-profile/favorites")}>
              <FavoriteIcon /> &nbsp;Favorites
            </MenuItem>
            <MenuItem onClick={() => navigate("/my-profile/payments")}>
              <PaymentIcon /> &nbsp;Payments
            </MenuItem>
            <MenuItem onClick={() => navigate("/my-profile/notification")}>
              <NotificationsIcon /> &nbsp;Notification
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <PersonIcon />&nbsp; Logout
            </MenuItem>
          </Menu>
        </div>
        <IconButton onClick={navigateToCart}>
          <Badge color="black" badgeContent={cart.cartItems.length} style={{ color: 'white' }}>
            <ShoppingCartIcon className="text-4xl" sx={{ fontSize: "2rem" }} />
          </Badge>
        </IconButton>
      </div>
      <Auth handleClose={handleCloseMenu} />
    </div>
  );
};

export default Navbar;
