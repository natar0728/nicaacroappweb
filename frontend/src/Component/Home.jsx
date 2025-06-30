import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // <-- IMPORTANTE
import {
  FaUserCheck,
  FaUsers,
  FaTicketAlt,
  FaClipboardList,
  FaUserCog,
  FaChartBar
} from 'react-icons/fa';

const Home = () => {
  const { userRole } = useContext(UserContext);

  const opcionesGenerales = [
    { rol: ['admin', 'organizador', 'host'], path: '/checkin', icon: <FaUserCheck />, label: 'Registro de entrada/salida' },
    { rol: ['admin', 'organizador'], path: '/staff', icon: <FaUsers />, label: 'Personal' },
    { rol: ['admin', 'organizador'], path: '/participants', icon: <FaTicketAlt />, label: 'Participantes' },
    { rol: ['admin', 'organizador'], path: '/entries', icon: <FaClipboardList />, label: 'Entradas y alojamiento' },
    { rol: ['admin'], path: '/staff-management', icon: <FaUserCog />, label: 'Administrador de personal' },
    { rol: ['admin'], path: '/participant-management', icon: <FaUserCog />, label: 'Administrador de participantes' },
    { rol: ['admin'], path: '/reports', icon: <FaChartBar />, label: 'Informes' }
  ];

  const opcionesFiltradas = opcionesGenerales.filter(op => op.rol.includes(userRole));

  return (
    <>
      <Navbar /> {/* <-- Aquí se incluye la barra de navegación */}
      <div className="container mt-5 pt-5 text-center">
        <h2 className="mb-4">Bienvenido a NicaAcro</h2>
        <p className="mb-5">Selecciona una opción del menú para continuar.</p>
        <div className="row justify-content-center">
          {opcionesFiltradas.map((opcion, index) => (
            <div className="col-md-4 col-sm-6 mb-4" key={index}>
              <Link to={opcion.path} className="text-decoration-none">
                <div
                  className="card shadow-sm p-4"
                  style={{ backgroundColor: '#F5E9DA', borderRadius: '10px' }}
                >
                  <div style={{ fontSize: '2rem', color: '#4CAF50' }}>{opcion.icon}</div>
                  <h5 className="mt-3" style={{ color: '#4E342E' }}>{opcion.label}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
