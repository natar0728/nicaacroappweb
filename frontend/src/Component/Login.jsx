import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const { setUserRole } = useContext(UserContext);
  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();

  if (locked) {
    alert('Has excedido el número de intentos. Intenta más tarde.');
    return;
  }

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      nombre_usuario: username,
      password: password
    });

    const { token } = response.data;

    localStorage.setItem('token', token);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const rol = payload.rol;

    setUserRole(rol);
    setAttempts(0); // reset intentos si inicia sesión con éxito
    navigate('/home');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    const nuevosIntentos = attempts + 1;
    setAttempts(nuevosIntentos);

    if (nuevosIntentos >= 3) {
      setLocked(true);
      alert('Demasiados intentos. Intenta más tarde.');
    } else {
      alert(`Credenciales incorrectas. Intento ${nuevosIntentos}/3`);
    }
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
        <button type="submit" className="btn btn-success w-100" style={{ backgroundColor: '#4CAF50' }} disabled={locked}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;