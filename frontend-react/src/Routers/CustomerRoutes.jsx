import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customers/pages/Home/HomePage'
import Navbar from '../customers/components/Navbar/Navbar'
import Cart from '../customers/pages/Cart/Cart'
import Profile from '../customers/pages/Profile/Profile'
import PaymentSuccess from '../customers/pages/PaymentSuccess/PaymentSuccess'
import Search from '../customers/components/Search/Search'
import CreateShopForm from '../Admin/AddShops/CreateShopForm'
import Shop from '../customers/pages/Shop/Shop'
import PasswordChangeSuccess from '../customers/pages/Auth/PasswordChangeSuccess'
import NotFound from '../customers/pages/NotFound/NotFound'
import PaymentCancel from '../customers/pages/PaymentCancel/PaymentCancel'
const CustomerRoutes = () => {
  return (
    <div className='relative'>
        <nav className="sticky top-0 z-50">
            <Navbar/>
        </nav>
        <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route exact path='/account/:register' element={<HomePage/>}/>
            <Route exact path='/shop/:city/:title/:id' element={<Shop/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
            <Route path='/payment/cancel' element={<PaymentCancel/>}/>

            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/admin/add-shop' element={<CreateShopForm/>}/>
            <Route exact path='/password_change_success' element={<PasswordChangeSuccess/>}/>
            <Route exact path='/*' element={<NotFound/>}/>
        </Routes>
       
    </div>
  )
}

export default CustomerRoutes