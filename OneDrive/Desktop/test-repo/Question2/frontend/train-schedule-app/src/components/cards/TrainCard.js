import React from 'react';
import "traincardstyle.css"
const TrainCard = ({ train }) => {
  return (
    <div className="train-card">
      <h3>Train: {train.trainNumber}</h3>
      <p>Departure: {train.departureTime}</p>
      <p>Price: ${train.price}</p>
      <p>Available Seats: {train.availableSeats}</p>
      <p>Coach Class: {train.coachClass}</p>
      <p>Delay: {train.delay} mins</p>
    </div>
  );
};
export default TrainCard;