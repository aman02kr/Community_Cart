import React from 'react'
import { shopCategories } from '../../../Data/shopCategories'

const CarouselItem = ({image,title}) => {
  return (
    
        <div className='flex flex-col justify-center items-center'>
            <img className='w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] rounded-full object-cover object-center' src={image} alt={title} />
            <span className='py-5 font-semibold text-xl text-gray-400'>{title}</span>
        </div>
         
    
  )
}

export default CarouselItem