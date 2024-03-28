import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../../../State/Customers/Orders/Action';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import OrderDetails from '../../components/Order/OrderDetail';
import TimeFormate from './TimeFormat';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { order, auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt]);

  // Function to handle order click
  const handleOrderClick = (order) => {
    navigate(`/my-profile/order-details/${order.id}`, { state: { order } });
  };

  // Sort orders in descending order based on IDs
  const sortedOrders = [...order.orders].sort((a, b) => b.id - a.id);

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-auto ml-[5%] mr-[5%]'>
        <TableContainer component={Paper} sx={{ maxHeight: '100vh', minWidth:'80vw', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => (
                <TableRow key={order.id} onClick={() => handleOrderClick(order)}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-5" style={{ width: '30vw' }}>
                      {order.items[0].product.images[0] && (
                        <img className="h-16 w-16" src={order.items[0].product.images[0]} alt="" />
                      )}
                      <div>
                        <p>{order.items[0].product.name}{order.items.length > 1 && (
                          <p>+{order.items.length - 1} more</p>
                        )}</p>
                        <p className="font-bold">₹{order.totalAmount}</p>
                        <p className="text-black-400">{order.items[0].product.shop.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell><TimeFormate timestamp={order.createdAt} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Orders;
