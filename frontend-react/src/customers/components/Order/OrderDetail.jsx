import React from 'react';
import { useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import OrderStatusStepper from './orderStatusStepper';
import { ShoppingCart, Description, DateRange, LocationOn, MonetizationOn, Email, Store } from '@mui/icons-material';
import { Card, CardContent, CardMedia } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    // Handle case where order data is not available
    return <div>Order details not found</div>;
  }

  return (
    <div className='ml-[10vw] mr-[10vw] mt-[5vw] mb-[5vw]'>
      <div className='mb-[2vw] font-bold underline'><h1>Order Details</h1></div>
      <List>
        <ListItem>
          <ListItemText primary={<><strong>Order ID:</strong> : {order.id}</>}  />
        </ListItem>
        {order.items.map((item, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardContent>
              <div className='flex flex-row justify-between'>
                <div>
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={<strong>Item Name:</strong>} secondary={item.product.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={<strong>Item Description:</strong>} secondary={item.product.description} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ProductionQuantityLimitsIcon />
                    </ListItemIcon>
                    <ListItemText primary={<strong>Quantity:</strong>} secondary={item.quantity} />
                  </ListItem>
                </div>
                <div>
                  <ListItem>
                    <ListItemText />
                    <CardMedia
                      component="img"
                      src={item.product.images[0]}
                      alt="Product"
                      style={{ width: '5vw' }}
                    />
                  </ListItem>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <ListItem>
          <ListItemIcon>
            <DateRange />
          </ListItemIcon>
          <ListItemText primary={<strong>Date:</strong>} secondary={order.createdAt} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary={<strong>Order Status:</strong>} secondary={order.orderStatus} />
        </ListItem>
        <div className='m-[3vw]'>
        <OrderStatusStepper orderStatus={order.orderStatus} />
      </div>
        <ListItem>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary={<strong>Delivery Address:</strong>} secondary={`${order.deliveryAddress.streetAddress}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CurrencyRupeeIcon />
          </ListItemIcon>
          <ListItemText primary={<strong>Total Amount:</strong>} secondary={`₹${order.totalAmount}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary={<strong>Email:</strong>} secondary={order.customer.email} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary={<strong>Shop Name:</strong>} secondary={order.items[0].product.shop.name} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary={<strong>Shop ID:</strong>} secondary={order.items[0].product.shop.id} />
        </ListItem>
      </List>
    </div>
  );
};

export default OrderDetails;
