import React, { useEffect } from "react";
import ShopCard from "./ShopCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopByUserId } from "../../State/Customers/Shop/shop.action";
import AddressCard from "../../customers/components/Address/AddressCard";
import AddShopCard from "./AddShopCard";


const AdminDashboard = () => {
  const params = useParams();
  const {shop}=useSelector(state=>state);
  console.log("params", params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopByUserId());
  }, []);

  return (
    <div className="lg:px-20">
     
      <div className="lg:flex flex-wrap justify-center">
        {shop.usersShop.map((item) => (
          <ShopCard item={item}/>
        ))}
        {shop.usersShop.length<1 && <AddShopCard/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
