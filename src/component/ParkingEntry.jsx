import React, { useState, useContext } from 'react';
import { ParkingLotContext } from '../context/parkingContext';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const ParkingEntryForm = () => {
  const [cedula, setCedula] = useState('');
  const [placa, setPlaca] = useState('');
  const { vehicles, parkVehicle, parkingSpaces } = useContext(ParkingLotContext);
  const [userVehicles, setUserVehicles] = useState([]);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cedula) {
      const filteredVehicles = vehicles.filter(vehicle => vehicle.userID === cedula);
      setUserVehicles(filteredVehicles);
    } else if (placa) {
      const found = vehicles.find(vehicle => vehicle.placaNumber === placa);
      setUserVehicles(found ? [found] : []);
    } else {
      setUserVehicles([]);
    }
  };
  
  /*const handleParkClick = (vehicleId, vehicleType) => {
    const { parkingSpaces, parkVehicle } = useContext(ParkingLotContext);
    const findEmptyParkingSpace = (vehicleType) => {
      const parkingType = vehicleType === 'car' ? 'cars' : 'motorcycles';
      const emptySpace = parkingSpaces[parkingType].find(space => !space.occupied);
      return emptySpace;
    };
  
    const emptySpace = findEmptyParkingSpace(vehicleType);
    if (emptySpace) {
      const { id: spaceId } = emptySpace;
      parkVehicle(vehicleId, vehicleType === 'car' ? 'cars' : 'motorcycles', spaceId);
      alert('parqueado');
    } else {
      alert('No hay espacios disponibles para estacionar este vehículo.');
    }
  };*/
  const handleParkClick = (vehicleId, vehicleType) => {
    const findEmptyParkingSpace = (vehicleType) => {
      const parkingType = vehicleType === 'car' ? 'cars' : 'motorcycles';
      const emptySpace = parkingSpaces[parkingType].find(space => !space.occupied);
      return emptySpace;
    };
  
    const vehicleAlreadyParked = Object.values(parkingSpaces).some(spaces =>
      spaces.some(space => space.vehicleId === vehicleId)
    );
  
    if (vehicleAlreadyParked) {
      alert('¡El vehículo ya está estacionado!');
      return;
    }
  
    const emptySpace = findEmptyParkingSpace(vehicleType);
  
    if (emptySpace) {
      const { id: spaceId } = emptySpace;
      parkVehicle(vehicleId, vehicleType === 'car' ? 'cars' : 'motorcycles', spaceId);
      alert('¡Vehículo estacionado con éxito!');
    } else {
      alert('No hay espacios disponibles para estacionar este vehículo.');
    }
  };
  

  const handleBack = () => {
    navigate('/home')
  };

  return (
    <div className="row">
    <form onSubmit={handleSubmit} className="mt-4 card col-6">
      <h2 className="mb-4">Ingreso de un vehiculo</h2>
      <div className="mb-3">
        <label htmlFor="Cedula" className="form-label">
          Ingrese la cédula:
        </label>
        <input
          type="text"
          className="form-control"
          id="Cedula"
          placeholder="Ingrese la cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="placa" className="form-label">
          Ingrese la placa:
        </label>
        <input
          type="text"
          className="form-control"
          id="placa"
          placeholder="Ingrese la placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
      <button className="m-4 btn btn-primary" onClick={handleBack}>
        Volver
      </button>
    </form>
    <div className="col-6">
      <h2>Vehículos del Usuario</h2>
      <ul className="list-group">
        {userVehicles.map(vehicle => (
          <li key={vehicle.id} className="list-group-item">
            <p className="mb-1">Placa: {vehicle.placaNumber}</p>
            <p className="mb-1">Modelo: {vehicle.model}</p>
            <p className="mb-1"> <button
              onClick={() => handleParkClick(vehicle.id, vehicle.type)}
              className="btn btn-success">Parquear</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ParkingEntryForm;
