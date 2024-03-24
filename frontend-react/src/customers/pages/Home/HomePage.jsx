import React, { useEffect, useState } from "react";
import "./HomePage.css";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import ShopCard from "../../components/ShopCard/ShopCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopsAction } from "../../../State/Customers/Shop/shop.action";
import calculateDistance from "../../util/calculateDistance";
import Footer from "../../components/Footer/footer";

const HomePage = () => {
  const { auth, shop } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState([0,0]);
  const [loadingShop,setLoadingShop] =useState(true);
  const [refresh, setRefresh] = useState(false); // State variable to trigger a re-render

  useEffect(() => {
    if (auth.user) {
      dispatch(getAllShopsAction(localStorage.getItem("jwt")));
    }
  }, [auth.user]);

  // useEffect(() => {
  //   getUserLocation()
  //     .then((location) => {
  //       setUserLocation(location);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // const getUserLocation = () => {
  //   return new Promise((resolve, reject) => {
  //     if (!navigator.geolocation) {
  //       reject("Geolocation is not supported by your browser");
  //     } else {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const userLocation = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           };
  //           resolve(userLocation);
  //         },
  //         (error) => {
  //           reject(`Geolocation error occurred: ${error.message}`);
  //         }
  //       );
  //     }
  //   });
  // };
 
  useEffect(() => {
    const savedLatitude = localStorage.getItem('latitude');
    const savedLongitude = localStorage.getItem('longitude');
     if (savedLatitude && savedLongitude) {
      setUserLocation([savedLatitude,savedLongitude]);
      console.log("1")
  }
      setLoadingShop(false);


  }, [localStorage.getItem('latitude'), localStorage.getItem('longitude')]);
  
  return (
    <div>
      <section className="-z-50 banner relative flex flex-col justify-center items-center">
      <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-7xl  font-bold color-black z-10 py-5 font-custom">Community Cart</p>
          <p className="z-10   text-gray-300 text-xl font-custom lg:text-4xl">
            Shop local, thrive together - Your neighborhood's ultimate marketplace.
          </p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
      <div className="">
        <br>
        </br>
        <br>
        </br>
        <p className="text-2xl font-semibold text-black py-3 pb-10">

            Shop  By Categories
          </p>
          <MultipleItemsCarousel />
        </div>
      </section>

      <section className="px-5 lg:px-20">
        <div className="">
          <h1 className="text-2xl font-semibold text-400 py-3 ">
            Shops near your location
          </h1>
          <div className="flex flex-wrap items-center justify-around ">
          {loadingShop ? (
        <p>Loading...</p>
      ) : (
        <>
          {userLocation && shop.shops.map((item, i) => {
            const distance = calculateDistance(
              userLocation[0],
              userLocation[1],
              item.address.latitude,
              item.address.longitude
            );
            if (distance <= 10000) {
              return (
                <ShopCard
                  data={item}
                  index={i}
                  key={i}
                  distance={distance / 1000} // Convert meters to kilometers
                />
              );
            }
            return null;
          })}
        </>
      )}
          </div>
        </div>
        

        <div class="container">
  <b><h2>CommunitCart - the one-stop shop for your local daily essentials</h2></b>
  <p>
    Can anyone understand your daily grains, medicines, and grocery needs other than your neighbourhood local Kirana store? We don’t think so! There is nothing as convenient as getting your monthly or daily "rashan" from your next-door local retailer. Why?
    <ol>
      <li>You already know the store and the retailer</li>
      <li>There are always great deals for customers</li>
      <li>You trust the quality of every product</li>
    </ol>
    When it comes to getting the freshest meat or monthly grains -- the local dukaan is where you want to be. They’ve been delivering you your essentials for years and they’ll always continue to do so in every situation. CommunitCart is a way to make this experience of online shopping seamless and efficient while retaining your relationship with your local retailers.
    All you need is an App on your mobile phone. This App is designed to give you access to your entire neighbourhood with a few easy clicks and navigation. From grains, oils, masalas to personal care products - CommunitCart covers all your daily essentials. CommunitCart has the largest catalogue with over 55,000 products across 145 categories. And the best part? These products come from your favourite local stores with the added convenience of online shopping. If you are someone who always says, “I only purchase from shops near me”, then your trusted shops have got you covered.
    Currently, CommunitCart delivers to 35+ cities in 1300+ pin codes across India. 100,000+ Local retailers have registered on the platform. 1,000,000+ local shoppers use the CommunitCart platform for daily essentials shopping. CommunitCart, gives you access to quality products from your trusted local retailers.
  </p>
  <b><h2>What are the Benefits of Shopping from CommunitCart?</h2></b>
  <p>
    Besides the fact that you will be supporting your local community and will no more need to Google "grocery stores near me" multiple times by ordering from your neighbourhood shops on CommunitCart; you will get the following benefits:
    <ol>
      <li>Good quality products - Shopping on CommunitCart is like taking a walk and bringing your daily essentials from the next-door retailer you have known all your life. Only, the process is more convenient and time-saving now. Since you already know the shopkeepers, you can blindly trust the quality of the products.</li>
      <li>Easy payments - Since we’re going cashless, paying cash every time you go to the Kirana store is difficult. However, with CommunitCart, you get all modes of payment--online, UPI, as well as cash.</li>
      <li>A choice between doorstep delivery and store pickup - With CommunitCart, all you have to do is select your products and buy from the comfort of your home. Your products will be delivered to your house in the shortest delivery time. Or if you choose to pick it up from the store, we enable that too.</li>
    </ol>
  </p>
</div>
      </section>
    
      <Footer />
    </div>
  );
};

export default HomePage;