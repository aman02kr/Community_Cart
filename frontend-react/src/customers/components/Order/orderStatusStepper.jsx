import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { CheckCircle, DirectionsRun, LocalShipping, QueryBuilder } from '@mui/icons-material';

const OrderStatusStepper = ({ orderStatus }) => {
  // Define labels for each step
  const steps = ['PENDING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'];

  // Custom icons for each step
  const icons = [
    <QueryBuilder />, // Pending
    <DirectionsRun />, // Out for Delivery
    <LocalShipping />, // Delivered
    <CheckCircle />, // Completed
  ];

  // Get the index of the active step based on the orderStatus value
  const activeStepIndex = steps.indexOf(orderStatus);
  return (
    <Stepper activeStep={activeStepIndex} >
        <Step>
            <StepLabel ><QueryBuilder /></StepLabel>
        </Step>
        <Step>
            <StepLabel><DirectionsRun /></StepLabel>
        </Step>
        <Step>
            <StepLabel><LocalShipping/></StepLabel>
        </Step>
        <Step>
            <StepLabel><CheckCircle/></StepLabel>
        </Step>
      {/* {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel icon={icons[index]}>{label}</StepLabel>
    //     </Step>
     ))} */}
    </Stepper>
  );
};

export default OrderStatusStepper;
