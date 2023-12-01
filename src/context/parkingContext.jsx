import React, { createContext, useState } from 'react';

const ParkingLotContext = createContext();

const ParkingLotProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const addVehicle = (vehicleData) => {
      setVehicles([...vehicles, vehicleData]);
    };
  
  const [parkingSpaces, setParkingSpaces] = useState({
    cars: [
      { id: 'c1', occupied: false, vehicleId: null },
      { id: 'c2', occupied: false, vehicleId: null },
      { id: 'c3', occupied: false, vehicleId: null },
      { id: 'c4', occupied: false, vehicleId: null },
      { id: 'c5', occupied: false, vehicleId: null },
      { id: 'c6', occupied: false, vehicleId: null },
    ],
    motorcycles: [
      { id: 'm1', occupied: true, vehicleId: null },
      { id: 'm2', occupied: true, vehicleId: null },
      { id: 'm3', occupied: true, vehicleId: null },
      { id: 'm4', occupied: true, vehicleId: null },
      { id: 'm5', occupied: true, vehicleId: null },
      { id: 'm6', occupied: true, vehicleId: null },
      { id: 'm7', occupied: true, vehicleId: null},
    ],
  });

  const parkVehicle = (vehicleId, parkingType, parkingSpaceId) => {
    const updatedParkingSpaces = { ...parkingSpaces };
    updatedParkingSpaces[parkingType] = updatedParkingSpaces[parkingType].map((space) =>
      space.id === parkingSpaceId
        ? { ...space, occupied: true, vehicleId }
        : space
    );
    setParkingSpaces(updatedParkingSpaces);
  };

  const unparkVehicle = (parkingType, parkingSpaceId) => {
    const updatedParkingSpaces = { ...parkingSpaces };
  updatedParkingSpaces[parkingType] = updatedParkingSpaces[parkingType].map((space) =>
    space.id === parkingSpaceId
      ? { ...space, occupied: false, vehicleId: null } // Liberar el espacio de estacionamiento y establecer el vehicleId a null
      : space
  );
  setParkingSpaces(updatedParkingSpaces);
  };

  return (
    <ParkingLotContext.Provider
      value={{ vehicles, parkingSpaces, parkVehicle, unparkVehicle, addVehicle }}
    >
      {children}
    </ParkingLotContext.Provider>
  );
};

export { ParkingLotContext, ParkingLotProvider };
