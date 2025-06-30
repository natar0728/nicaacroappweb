import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {userRole, setUserRole } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Usuarios simulados
    const users = [
      { username: 'admin', password: '123', role: 'admin' },
      { username: 'organizador', password: '123', role: 'organizador' },
      { username: 'host', password: '123', role: 'host' },
    ];

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      setUserRole(foundUser.role); // ⬅️ Guardamos el rol en contexto
      navigate('/home');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#F5E9DA' }}>
      <form onSubmit={handleLogin} className="p-4 shadow rounded" style={{ backgroundColor: 'white', width: '350px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success w-100" style={{ backgroundColor: '#4CAF50' }}>Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;