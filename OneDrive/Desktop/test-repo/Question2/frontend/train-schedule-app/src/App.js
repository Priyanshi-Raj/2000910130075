import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Alltrains from './components/sections/Alltrains';
import Onetrain from './components/sections/Onetrain';

function App() {
  return (
    <>
    <h1>Train schedule web app</h1>
   
    <Routes>
    
        <Route exact path="/" component={Alltrains} />
  
        <Route exact path="/trains/:trainid" component={Onetrain} />
      
    </Routes></>
  );
}

export default App;
