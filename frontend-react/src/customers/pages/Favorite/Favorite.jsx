import React, { useEffect } from 'react'
import ShopCard from '../../components/ShopCard/ShopCard'
import { useDispatch, useSelector } from 'react-redux'

const Favorite = () => {
  const {auth}=useSelector(store=>store);

  useEffect(()=>{
    // dispatch()
  },[])
  return (
   <div>
    <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
     <div className='flex flex-wrap justify-center'>
      {auth.favorites?.map((item)=><ShopCard data={item}/>)}
    </div>
   </div>
  )
}

export default Favorite