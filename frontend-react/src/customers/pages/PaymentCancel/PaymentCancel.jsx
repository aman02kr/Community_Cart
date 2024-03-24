import React, { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartAction } from "../../../State/Customers/Cart/cart.action";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/");
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart when payment is canceled
    dispatch(clearCartAction());
  }, []);

  return (
    <div className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">
          <CancelIcon sx={{ fontSize: "5rem", color: red[600] }} />
          <h1 className="py-5 text-2xl font-semibold">Payment Cancelled</h1>
          <p className="py-3 text-center text-400">
            Your payment was cancelled. If you have any questions, please contact support.
          </p>
          <Button
            variant="contained"
            className="my-5"
            sx={{ margin: "1rem 0rem" }}
            onClick={navigateToHome}
          >
            Go To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;