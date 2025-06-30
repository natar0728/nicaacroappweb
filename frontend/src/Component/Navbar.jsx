import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const Navbar = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    setUserRole(null); // Limpiar el rol
    navigate('/'); // Redirigir al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#4E342E', position: 'fixed', width: '100%', top: 0, zIndex: 999 }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">NicaAcro</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">

            {/* Opciones disponibles para todos */}
            {userRole && (
              <li className="nav-item">
                <Link className="nav-link" to="/checkin">Check-in/Check-out</Link>
              </li>
            )}

            {/* Solo admin y organizador */}
            {(userRole === 'admin' || userRole === 'organizador') && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/staff">Staff</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/participants">Participantes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entries">Entradas y Alojamiento</Link>
                </li>
              </>
            )}

            {/* Solo admin */}
            {userRole === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/staff-management">Administrador de personal</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/participant-management">Administrador de participantes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reports">Informes</Link>
                </li>
              </>
            )}

            {/* Botón de Cerrar sesión */}
            {userRole && (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
