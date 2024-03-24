import { Button, Card } from "@mui/material";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const OrderCard = ({created,order,status,orderId}) => {
  const CreatedAt=created;
  const dateObject = new Date(CreatedAt);

const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
const day = dateObject.getDate();
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();
const formattedDate = `${year}-${month}-${day}`;
const formattedTime = `${hours}:${minutes}:${seconds}`;
  return (
    <TableContainer component={Paper}>
      <Table>
         
        <TableBody>
          <TableRow>
            <TableCell>{orderId}</TableCell>
            <TableCell>
            <div className="flex items-center space-x-5" style={{ width: '30vw' }}> {/* Adjust width as needed */}
  <img className="h-16 w-16" src={order.product?.images[0]} alt="" />
  <div>
    <p>{order.product?.name}</p>
    <p className="font-bold">₹{order.product?.price}</p>
    <p className="text-black-400">{order.product?.shop.name}</p>
  </div>
</div>
            </TableCell>
            <TableCell>
              <Button className="cursor-not-allowed" variant="contained">{status}</Button>
            </TableCell>
            <TableCell>
              <div className="p-15">
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderCard;
