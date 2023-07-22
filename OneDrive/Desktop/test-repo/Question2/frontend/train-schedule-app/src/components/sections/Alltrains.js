
import React, { useEffect, useState } from 'react';

import TrainList from '../TrainList';
import axios from 'axios';
const Alltrains = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
 
    axios
      .get('/trains')
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error('Error ', error);
      });
  }, []);

  return (
    <div>
      
      <TrainList trains={trains} />
    </div>
  );
};

export default Alltrains;