import React from "react";
import "./Shop.css";
import { useNavigate } from "react-router-dom";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { isPresentInFavorites } from "../../../config/logic";
import { addToFavorites } from "../../../State/Authentication/Action";

const ShopCard = ({ data, index, distance }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites({ shopId: data.id, jwt: auth.jwt || jwt }));
  };

  const navigateToShop = () => {
    if (data.open) navigate(`/shop/${data.address.city}/${data.name}/${data.id}`);
  };

  return (
    <Card className="m-5 w-[18rem] productCard">
      <div onClick={navigateToShop} className={`${data.open ? "cursor-pointer" : "cursor-not-allowed"} relative`}>
        <img className="w-full h-[10rem] rounded-t-md object-cover" src={data.images[0]} alt="" />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={data.open ? "success" : "error"}
          label={data.open ? "Open" : "Closed"}
        />
{distance !== null && (
    <p className="absolute top-2 right-2 text-sm text-black bg-yellow-500 p-1 rounded-md">
        {distance ? distance.toFixed(2) + " km" : "0 km"}
    </p>
)}      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg">{data.name}</p>
          <p className="text-black-500 text-sm">
            {data.description.length > 40 ? data.description.substring(0, 40) + "..." : data.description}
          </p>
        </div>

        <div>
          <IconButton onClick={handleAddToFavorites}>
            {isPresentInFavorites(auth.favorites, data) ? <FavoriteIcon color="#d918f3" /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default ShopCard;
