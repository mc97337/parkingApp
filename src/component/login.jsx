// Login.js
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      login(username, password);
      setError('');
      navigate('/home'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
        <div className="card m-5 p-5">
        <h2>Iniciar sesión</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
