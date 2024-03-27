import React, { useEffect, useState } from 'react';
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

  // Define icon colors based on condition
  const iconColors = {
    true: '#7132F9', // Blue color when active
    false: 'inherit', // Use default color when not active
  };

  const [showStepNames, setShowStepNames] = useState(window.innerWidth >= 800);

  useEffect(() => {
    const handleResize = () => {
      setShowStepNames(window.innerWidth >= 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Stepper activeStep={activeStepIndex}>
      {steps.map((step, index) => (
        <Step key={step}>
          <StepLabel icon={React.cloneElement(icons[index], {
            style: { color: index <= activeStepIndex ? iconColors.true : iconColors.false } // Apply color based on condition
          })}>
            {showStepNames && step} {/* Conditionally render step name based on screen width */}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderStatusStepper;
