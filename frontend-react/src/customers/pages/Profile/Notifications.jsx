import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
import { Card } from "@mui/material";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
const Notifications = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);

  useEffect(() => {

    dispatch(getUsersNotificationAction(localStorage.getItem("jwt")));
  }, []);
  

  return (
    <div className="space-y-5 px-5 lg:px-20">
      <h1 className="py-5 font-bold text-2xl text-center">Notifications</h1>
      {order.notifications.map((item) => (
        <Card className="p-5">
          <MarkUnreadChatAltIcon/>
          <div className="flex justify-between ">
            
          <p>Dear {item.customer.fullName}&nbsp;{item.message}</p>
          <div>
            <p>{item.sentAt}</p>
          </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
