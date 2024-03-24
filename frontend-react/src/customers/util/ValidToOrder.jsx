export function isValid(cartItems){
    console.log("cartItems -------------- ",cartItems[0].product?.shop.id)
    const shopId=cartItems[0]?.product?.shop.id
   
    for(let item of cartItems){
        console.log("item ---- ", item.shop?.id)
      if(item.product?.shop.id!==shopId){
        return false;
      }
    }
    return true
  }