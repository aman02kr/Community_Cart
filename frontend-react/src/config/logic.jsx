export const isPresentInFavorites=(favorites,shop)=>{
    for(let item of favorites){
      if(shop.id===item.id)return true
    }
    return false;
  }