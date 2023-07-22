import React from 'react';
import TrainCard from './TrainCard';
const TrainList = ({ trains }) => {
  return (
    <div>
      {trains.map((train) =>
       (
        <TrainCard key={train._id} train={train}/>
      ))}
    
    </div>
  );
};
export default TrainList;