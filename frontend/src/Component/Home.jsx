import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import {
  FaUserCheck,
  FaUsers,
  FaTicketAlt,
  FaClipboardList,
  FaUserCog,
  FaChartBar
} from 'react-icons/fa';

const Home = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Si no hay rol en contexto, lo asignamos desde el token
      if (!userRole) {
        setUserRole(payload.rol);
      }
    } catch (error) {
      console.error('Token inválido', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [userRole, setUserRole, navigate]);

const opcionesGenerales = [
  { rol: ['Administrador', 'Organizador', 'Host'], path: '/checkin', icon: <FaUserCheck />, label: 'Registro de entrada/salida' },
  { rol: ['Administrador', 'Organizador'], path: '/staff', icon: <FaUsers />, label: 'Personal' },
  { rol: ['Administrador', 'Organizador'], path: '/participants', icon: <FaTicketAlt />, label: 'Participantes' },
  { rol: ['Administrador', 'Organizador'], path: '/entries', icon: <FaClipboardList />, label: 'Entradas y alojamiento' },
  { rol: ['Administrador'], path: '/staff-management', icon: <FaUserCog />, label: 'Administrador de personal' },
  { rol: ['Administrador'], path: '/participant-management', icon: <FaUserCog />, label: 'Administrador de participantes' },
  { rol: ['Administrador'], path: '/reports', icon: <FaChartBar />, label: 'Informes' }
];


  const opcionesFiltradas = opcionesGenerales.filter(op => op.rol.includes(userRole));

  return (
    <>
      <Navbar />
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
