import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { ParkingLotProvider } from './context/parkingContext';
import Login from './component/login';
import Home from './component/home';
import RegisterVehicle from './component/RegisterVehicle';
import ParkingEntryForm from './component/ParkingEntry';
import ParkingSpaces from './component/ParkingSpaces';

function App() {
  return (
    <ParkingLotProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register-vehicle" element={<RegisterVehicle />} />
            <Route path="/entry-vehicle" element={<ParkingEntryForm />} />
            <Route path="/parking" element={<ParkingSpaces />} />
          </Routes>
        </Router>
      </UserProvider>
    </ParkingLotProvider>
  );
}

export default App;
