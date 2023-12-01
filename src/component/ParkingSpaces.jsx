import React, { useContext } from 'react';
import { ParkingLotContext } from '../context/parkingContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ParkingSpaces = () => {
  const { parkingSpaces, vehicles,unparkVehicle } = useContext(ParkingLotContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const isSpaceOccupied = (spaceId) => {
    const space = parkingSpaces.cars.concat(parkingSpaces.motorcycles).find(space => space.id === spaceId);
    return space && space.vehicleId !== null;
  };

  const getVehicleInfo = (spaceId) => {
    const space = parkingSpaces.cars.concat(parkingSpaces.motorcycles).find(space => space.id === spaceId);
    if (space && space.vehicleId !== null) {
      const vehicle = vehicles.find(vehicle => vehicle.id === space.vehicleId);
      if (vehicle) {
        return (
          <div>
            <p>Placa: {vehicle.placaNumber}</p>
            <p>Dueño: {vehicle.userID}</p>
          </div>
        );
      }
    }
    return null;
  };

  const handleUnparkClick = (spaceId) => {
    const space = parkingSpaces.cars.concat(parkingSpaces.motorcycles).find(space => space.id.toString().startsWith(spaceId.toString()));
    if (space && space.occupied) {
      const parkingType = space.id.startsWith('c') ? 'cars' : 'motorcycles';
      unparkVehicle(parkingType, spaceId);
      alert(`Espacio ${spaceId} liberado.`);
    } else {
      alert(`El espacio ${spaceId} ya está libre.`);
    }
  };

  const parkingSpacesView = [];
  for (const space of parkingSpaces.cars.concat(parkingSpaces.motorcycles)) {
    const isOccupied =isSpaceOccupied(space.id);
    const userRole = user ? user.role : '';
    const isEmployee = userRole === 'celador';
    parkingSpacesView.push(
      <div key={space.id} className={`col-sm-3  ${isOccupied ? 'bg-danger' : 'bg-success'}`}>
        <p>Parqueadero {space.id}</p>
        {isOccupied && getVehicleInfo(space.id)}
        {isOccupied && isEmployee && (
          <button onClick={() => handleUnparkClick(space.id)} className="btn btn-sm btn-primary mt-2">
            Liberar
          </button>
        )}
      </div>
    );
  }

    const handleBack = () => {
      navigate('/home')
    };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Parqueadero</h2>
      <div className="row">
        {parkingSpacesView}
      </div>
      <div className="col-sm">
      <button className="m-4 btn btn-primary" onClick={handleBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default ParkingSpaces;
