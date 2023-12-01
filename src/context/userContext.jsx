import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: '21774653', username: 'empleado1', password: '123456', role: 'empleado' },
    { id: '71020659', username: 'empleado2', password: '123456', role: 'empleado'  },
    { id: '1234990405', username: 'celador1', password: '123456', role: 'celador'  },
    { id: '1001028985', username: 'celador2', password: '123456', role: 'celador'  },
  ]);

  const [user, setUser] = useState([
    { id: '21774653', username: 'celador1', password: '123456', role: 'celador' }]);

  const login = (username, password) => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
    } else {
      setUser(null);
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
