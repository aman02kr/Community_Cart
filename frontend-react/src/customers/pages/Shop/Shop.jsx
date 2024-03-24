import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ProductListItemCard from "../../components/ProductListItem/ProductListItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getShopById, getShopsCategory } from "../../../State/Customers/Shop/shop.action";
import { getProductListItemsByShopId } from "../../../State/Customers/ProductList/productList.action";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import Footer from "../../components/Footer/footer";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import zIndex from "@mui/material/styles/zIndex";
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { Card, CardContent, IconButton } from '@mui/material';

import ReviewComponent from "../../components/reviews/reviews";
// const categories = [
//   "Thali",
//   "Starters",
//   "Indian Main Course",
//   "Rice and Biryani",
//   "Breads",
//   "Accompaniments",
//   "Dessert",
// ];

// const productTypes = [
//   {label:"All",value:"all"},
//   { label: "Vegetarian Only", value: "vegetarian" },
//   { label: "Non-Vegetarian Only", value: "non_vegetarian" },
//   {label:"Seasonal",value:"seasonal"},
  
// ];
const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { shop, productList } = useSelector((store) => store);
  const navigate = useNavigate();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const productType = searchParams.get("product_type");
  const productCategory = searchParams.get("product_category");
  const jwt=localStorage.getItem("jwt")
  const [position, setPosition] = useState([51.505, -0.09]); // Default position
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    dispatch(
      getShopById({
        jwt: localStorage.getItem("jwt"),
        shopId: id,
      })
    );
    
    dispatch(
      getProductListItemsByShopId({
        jwt: localStorage.getItem("jwt"),
        shopId: id,
        seasonal: productType==="seasonal",
        vegetarian: productType==="vegetarian",
        nonveg: productType==="non_vegetarian",
        productCategory: productCategory || ""
      })
    );
    dispatch(getShopsCategory({shopId:id,jwt}))
  }, [id,productType,productCategory]);

  
  useEffect(()=>{
    const timeout = setTimeout(() => {
      if (shop.shop?.address.latitude && shop.shop?.address.longitude) {
        setPosition([shop.shop?.address.latitude, shop.shop?.address.longitude]);
        setLoading(false);
      }
    }, 1000); // One second delay
  
    return () => clearTimeout(timeout); 
  },[shop]);
  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);
  
    if(value==="all"){
      searchParams.delete(e.target.name);
      searchParams.delete("product_category");
    }
    else searchParams.set(e.target.name, e.target.value); 

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  
  

  return (
    <><div className="px-5 lg:px-20 " style={{marginBottom:"100px"}}>
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/{shop.shop?.address.country}/
          {shop.shop?.name}/{shop.shop?.id}/Order Online
        </h3>
        <div>
         
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <img
            style={{ width: '100%', height: '40vh', objectFit: 'cover', border: '2px solid #ccc' ,borderTopLeftRadius: '8px', borderTopRightRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
            className="w-full h-[40vh] object-cover"
            src={shop.shop?.images[0]}
            alt=""
          />
            </Grid>
           
          </Grid>
        </div>
        <div className="pt-3 pb-5" style={{background:"#7132F9",borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
          <div style={{margin:"20px"}}>
          <h1 className="text-4xl font-semibold">
            {shop.shop?.name}
          </h1>
          <p className="text-500 mt-1">{shop.shop?.description}</p>
          <div className="space-y-3 mt-3">
              <p className="text-500 flex items-center gap-3">
            <LocationOnIcon/> <span>{shop.shop?.address.streetAddress}
              </span> 
          </p>
          <p className="flex items-center gap-3 text-500">
           <TodayIcon/> <span className=" text-yellow-300"> {shop.shop?.openingHours} (Today)</span>  
          </p>
          </div>
          </div>
        </div>
      </section>
      <Divider />

      <section className="pt-[2rem] lg:flex relative ">
        <div className="space-y-10 lg:w-[20%] filter" >
          <div className="box space-y-5 lg:sticky top-28" style={{ borderRadius: '8px', marginBottom:"20px"}}>
            
            <div className="">
              
              <FormControl className="py-10 space-y-5" component="fieldset">
                
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Item Category
              </Typography>
                <RadioGroup
                  name="product_category"
                  value={productCategory || "all"}
                  onChange={handleFilter}
                >
                   <FormControlLabel
                      
                      value={"all"}
                      control={<Radio />}
                      label={"All"}
                      sx={{ color: "gray" }}
                    />
                  {shop?.categories.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          {productList?.productListItems.map((item) => (
            <ProductListItemCard item={item} />
            // <p>ashok</p>
          ))}
        </div>
      </section>
    </div>
    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={productList.loading || shop.loading}
  
>
  <CircularProgress color="inherit" />
</Backdrop>

<div className="flex flex-col justify-center items-center" style={{ margin: '100px' }}>
  <div className="p-5 font-bold" >
  <p><h2> <LocationOnIcon/> Shop Location </h2></p>
  </div>

<div style={{zIndex:'0'}}>
      {loading ? (
        <CircularProgress />
      ) : (
        <MapContainer center={position} zoom={18} fadeAnimation={true} markerZoomAnimation={true}scrollWheelZoom={true} style={{height: '400px', width: '80vw',borderRadius:'10px' ,border:'2px solid black'}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup> <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
                <h3>{shop.shop?.name}</h3>
              </div>
              </Popup>
           
          </Marker>
        </MapContainer>
      )}
    </div>
    </div>
    {/* <Card className="mx-auto" style={{ maxWidth: '80vw' ,marginBottom:'5vw'}}>
      <CardContent>
        {currentReview && (
          <div>
            <Typography variant="h6">Rating & Reviews</Typography>
            <Rating name="half-rating" value={currentReview.rating} precision={0.5} readOnly />
            <Typography variant="body1">{currentReview.text}</Typography>
          </div>
        )}
        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <Button variant="contained" onClick={handleNextReview}>
            <ArrowForwardIcon  style={{ }} />
          </Button>
        </div>
      </CardContent>
    </Card> */}
    <ReviewComponent shopId={shop.shop?.id} token={localStorage.getItem("jwt")}/>

    
<Footer/>
    </>
    
  );
};

export default Shop;
