import React, { useEffect } from 'react'
import OrderCard from '../../components/Order/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../../../State/Customers/Orders/Action';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Orders = () => {
  const {order,auth}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")
  useEffect(()=>{
    dispatch(getUsersOrders(jwt))
  },[auth.jwt])
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-auto ml-[5%] mr-[5%]'>
        <Table>
      <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        </Table>
     { order.orders.map((order)=>order.items.map((item)=><OrderCard orderId={order.id} created={order.createdAt} status={order.orderStatus} order={item}/>))}
    </div>
    </div>
  )
}

export default Orders