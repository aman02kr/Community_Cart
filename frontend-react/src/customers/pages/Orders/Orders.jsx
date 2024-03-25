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

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-auto ml-[5%] mr-[5%]'>
        <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
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
              {order.orders.map((order) => order.items.map((item) =>
                <TableRow key={order.id} onClick={() => handleOrderClick(order)}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-5" style={{ width: '30vw' }}>
                      <img className="h-16 w-16" src={item.product?.images[0]} alt="" />
                      <div>
                        <p>{item.product?.name}</p>
                        <p className="font-bold">₹{item.product?.price}</p>
                        <p className="text-black-400">{item.product?.shop.name}</p>
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
      {/* Render the OrderDetailsModal component if selectedOrder is not null */}
      {/* {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />} */}
    </div>
  );
}

export default Orders;
