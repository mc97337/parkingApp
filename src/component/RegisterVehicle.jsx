import React, { useContext, useState } from 'react';
import { ParkingLotContext } from '../context/parkingContext';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const AddVehicleForm = () => {
  const { vehicles, addVehicle } = useContext(ParkingLotContext);
  const { user } = useContext(UserContext);
  const [vehicleType, setVehicleType] = useState('car'); 
  const [placaNumber, setPlacaNumber] = useState('');
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [cilindraje, setCilindraje] = useState('');

  const navigate = useNavigate();
  const isPlacaNumberUnique = (placaNumber) => {
    return vehicles.every((vehicle) => vehicle.placaNumber !== placaNumber);
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    
    const placaExists = !isPlacaNumberUnique(placaNumber);

    if (placaExists) {
      alert('¡La placa ya está registrada!');
      return;
    }else{
      const userID = user ? user.id : '';
      const vehicleData = {
        id: vehicles.length + 1,
        type: vehicleType,
        placaNumber,
        model,
        brand,
        cilindraje,
        userID,
      };
      

      if (!placaNumber || !brand) {
        alert('Por favor, complete los campos obligatorios.');
        return;
      }
    
      const placaRegex = /^[A-Za-z]{3}[0-9]{3}$/;
      const validPlaca = placaRegex.test(placaNumber);
    
      if (!validPlaca) {
        alert('El número de placa debe tener 3 letras seguidas de 3 números.');
        return;
      }

      if (vehicleType === 'car') {
        if (!model) {
          alert('Por favor, ingrese el modelo del carro.');
          return;
        }
        vehicleData.model = model;
      } else if (vehicleType === 'motorcycle') {
        if (!cilindraje) {
          alert('Por favor, ingrese el cilindraje de la moto.');
          return;
        }
        vehicleData.cilindraje = cilindraje;
      }
      addVehicle(vehicleData);
    }

    
    setPlacaNumber('');
    setModel('');
    setBrand('');
    setCilindraje('');
  };

    const handleBack = () => {
      navigate('/home')
    };
  return (
    <form>
      <div className="container">
      <h2>Registrar Vehículo</h2>
        <div className="mb-3">
          <label htmlFor="vehicleType" className="form-label">
            Tipo de vehículo:
          </label>
          <select className="form-select" id="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}>
            <option value="car">Carro</option>
            <option value="motorcycle">Moto</option>
          </select>
        </div>
        {vehicleType === 'car' ? (
          <div>
            <div className="mb-3">
              <label htmlFor="carPlacaNumber" className="form-label">
                Número de placa:
              </label>
              <input type="text"
                className="form-control"
                id="carPlacaNumber"
                placeholder="Ingrese el número de placa del carro"
                value={placaNumber}
                onChange={(e) => setPlacaNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="carModel" className="form-label">
                Modelo:
              </label>
              <input
                type="text"
                className="form-control"
                id="carModel"
                placeholder="Ingrese el modelo del carro"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="carBrand" className="form-label">
                Marca:
              </label>
              <input
                type="text"
                className="form-control"
                id="carBrand"
                placeholder="Ingrese la marca del carro"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <label htmlFor="motorcyclePlacaNumber" className="form-label">
                Número de placa:
              </label>
              <input
                type="text"
                className="form-control"
                id="motorcyclePlacaNumber"
                placeholder="Ingrese el número de placa de la moto"
                value={placaNumber}
                onChange={(e) => setPlacaNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="motorcycleCilindraje" className="form-label">
                Cilindraje:
              </label>
              <input
                type="text"
                className="form-control"
                id="motorcycleCilindraje"
                placeholder="Ingrese el cilindraje de la moto" value={cilindraje}
                onChange={(e) => setCilindraje(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="motorcycleBrand" className="form-label">
                Marca:
              </label>
              <input
                type="text"
                className="form-control"
                id="motorcycleBrand"
                placeholder="Ingrese la marca de la moto" value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary" onClick={handleAddVehicle}>
          Registrar Vehículo
        </button>
        <button className="m-4 btn btn-primary" onClick={handleBack}>
          Volver
        </button>
    </div>
    </form>
  );
};

export default AddVehicleForm;
