import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleBack = () => {
      navigate('/');
      logout();
  };

  const redirectTo = (path) => {
      navigate(path);
  };

  const handleParkingSpaces = () => {
    navigate('/parking')
  }

  const renderButtonsBasedOnRole = () => {
      const userRole = user ? user.role : '';
      const isEmployee = userRole === 'empleado';

      return (
          <div>
              <p>Bienvenido: {userRole}</p>
              <button onClick={() => redirectTo(isEmployee ? '/register-vehicle' : '/entry-vehicle')} className="btn btn-primary">
                  {isEmployee ? 'Registrar vehículo' : 'Ingreso vehículo'}
              </button>
              <button className="m-4 btn btn-primary" onClick={handleParkingSpaces}>
                  Ver parqueaderos
              </button>
              <button className="m-4 btn btn-primary" onClick={handleBack}>
                  Volver
              </button>
          </div>
      );
  };

  return (
      <div>
          {user && renderButtonsBasedOnRole()}
      </div>
  );
};

export default Home;
