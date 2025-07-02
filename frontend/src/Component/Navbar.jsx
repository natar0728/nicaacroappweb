import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import {
  FaUsers,
  FaUserCheck,
  FaUserCog,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaUserPlus,
  FaIdBadge
} from 'react-icons/fa';

const Navbar = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setUserRole(null);
    navigate('/login');
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

            {/* GESTIÓN: disponible para Admin y Organizador */}
            {(userRole === 'Administrador' || userRole === 'Organizador') && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="gestionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUsers className="me-1" /> Gestión
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="gestionDropdown">
                  <li><Link className="dropdown-item" to="/staff">Staff</Link></li>
                  <li><Link className="dropdown-item" to="/voluntarios">Voluntarios</Link></li>
                  <li><Link className="dropdown-item" to="/participants">Participantes</Link></li>
                </ul>
              </li>
            )}

            {/* OPERACIONES: todos los roles */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="operacionesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FaUserCheck className="me-1" /> Operaciones
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="operacionesDropdown">
                <li><Link className="dropdown-item" to="/checkin">Check-in/Check-out</Link></li>
                <li><Link className="dropdown-item" to="/entries">Entradas y Alojamiento</Link></li>
              </ul>
            </li>

            {/* ADMINISTRACIÓN: solo para Administrador */}
            {userRole === 'Administrador' && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUserCog className="me-1" /> Administración
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                  <li><Link className="dropdown-item" to="/staff-management">Administrar Staff</Link></li>
                  <li><Link className="dropdown-item" to="/participant-management">Administrar Participantes</Link></li>
                  <li><Link className="dropdown-item" to="/register-user">Registrar Usuario</Link></li>
                  <li><Link className="dropdown-item" to="/perfil">Editar Perfil</Link></li>
                </ul>
              </li>
            )}

            {/* REPORTES: solo Administrador */}
            {userRole === 'Administrador' && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="reportesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaChartBar className="me-1" /> Reportes
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="reportesDropdown">
                  <li><Link className="dropdown-item" to="/reports">Ver Informes</Link></li>
                  <li><Link className="dropdown-item" to="/user-list">Gestión de Usuarios</Link></li>
                </ul>
              </li>
            )}

            {/* Cerrar sesión */}
            {userRole && (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={cerrarSesion}>
                  <FaSignOutAlt className="me-1" /> Cerrar sesión
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

