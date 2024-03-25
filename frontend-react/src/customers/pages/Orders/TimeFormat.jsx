import React from 'react';
import { format } from 'date-fns';

const TimeFormate = ({ timestamp }) => {
  const formattedTimestampdate = format(new Date(timestamp), 'yyyy-MM-dd');
   const formattedTimestamptime = format(new Date(timestamp), ' HH:mm:ss');

  return (
    <div className="p-15">
    <p>{formattedTimestampdate}</p>
    <p>{formattedTimestamptime}</p>
  </div>
  );
};

export default TimeFormate;
