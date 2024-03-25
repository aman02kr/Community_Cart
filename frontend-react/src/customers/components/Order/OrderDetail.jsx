import React from 'react';
import { useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import OrderStatusStepper from './orderStatusStepper';
import { ShoppingCart, Description, DateRange, LocationOn, MonetizationOn, Email, Store } from '@mui/icons-material';

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    // Handle case where order data is not available
    return <div>Order details not found</div>;
  }

  return (
    <div className='ml-[10vw] mr-[10vw]'>
      <div className='mb-[2vw] font-bold'><h1>Order Details</h1></div>
      <List>
        <ListItem>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary={`Order ID: ${order.id}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary={`Item Name: ${order.items[0].product.name}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary={`Item Description: ${order.items[0].product.description}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Item Images:" />
          <img src={order.items[0].product.images[0]} style={{ width: '10vw' }} alt="Product" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DateRange />
          </ListItemIcon>
          <ListItemText primary={`Date: ${order.createdAt}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary={`Order Status: ${order.orderStatus}`} />
        </ListItem>
        </List>
        <div className='m-[3vw]'>
        <OrderStatusStepper orderStatus={order.orderStatus} />
      </div>
        <List>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary="Delivery Address:" secondary={`${order.deliveryAddress.streetAddress}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MonetizationOn />
          </ListItemIcon>
          <ListItemText primary={`Total Amount: ₹${order.totalAmount}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary={`Email: ${order.customer.email}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary={`Shop Name: ${order.items[0].product.shop.name}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary={`Shop ID: ${order.items[0].product.shop.id}`} />
        </ListItem>
      </List>
      
    </div>
  );
};

export default OrderDetails;
