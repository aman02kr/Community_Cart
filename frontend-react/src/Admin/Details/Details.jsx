import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
// import XIcon from '@mui/icons-material/X';
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  updateShop,
  updateShopStatus,
} from "../../State/Customers/Shop/shop.action";

const Details = () => {
  const dispatch = useDispatch();
  const { auth, shop, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleShopStatus = () => {
    dispatch(
      updateShopStatus({
        shopId: shop.usersShop.id,
        jwt: auth.jwt || jwt,
      })
    );
  };
  return (
    <div className="lg:px-20 px-5">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {shop.usersShop?.name}
        </h1>
        <div>
          <Button
            onClick={handleShopStatus}
            size="large"
            // sx={{ padding: "1rem 2rem" }}
            className="py-[1rem] px-[2rem]"
            variant="contained"
            color={shop.usersShop?.open ? "error" : "primary"}
          >
            {shop.usersShop?.open
              ? "Close"
              : "Open"}
          </Button>
        </div>
      </div>

      <Grid container spacing={2} style={{border:'2px solid black'}}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-300"> Shop</span>}
            />
            <CardContent>
              <div className="space-y-4 text-200" >
                <div className="flex">
                  <p className="w-48">Owner</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.owner.fullName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Shop Name</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Shop Type</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.shopType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Opning Hours</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Status</p>
                  <div className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-950">
                        Open
                      </span>
                    ) : (
                      <span className="text-black px-5 py-2 rounded-full bg-red-400">
                        Closed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card>
            <CardHeader
              title={<span className="text-300"> Address</span>}
            />
            <CardContent>
              <div className="space-y-3 text-200">
                <div className="flex">
                  <p className="w-48">Country</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.address.country}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">City</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.address.city}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Postal Code</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.address.postalCode}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Street Address</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    {shop.usersShop?.address.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Card>
            <CardHeader
              title={<span className="text-300"> Contact</span>}
            />
            <CardContent>
              <div className="space-y-3 text-200">
                <div className="flex">
                  <p className="w-48">Email</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>
                    {shop.usersShop?.contactInformation.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Mobile</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>
                    {" +91"}
                    {shop.usersShop?.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-48">Social</p>
                  <div className="text-400 flex items-center pb-3">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    <a
                      target="_blank"
                      href={
                        shop.usersShop?.contactInformation.instagram
                      }
                      rel="noreferrer"
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        shop.usersShop?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        shop.usersShop?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="ml-5"
                      href={
                        shop.usersShop?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
                {/* <div className="flex">
                  <p className="w-48">Twitter</p>
                  <p className="text-400">
                    {" "}
                    <span className="pr-5">-</span>{" "}
                    <a
                      href={
                        shop.usersShop?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon sx={{fontSize:"3rem"}} />
                    </a>
                  </p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
