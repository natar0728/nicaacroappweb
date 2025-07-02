import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

import Login from './Component/Login';
import Home from './Component/Home';
import CheckinCheckout from './Component/CheckinCheckout';
import Staff from './Component/Staff';
import Participantes from './Component/Participantes';
import EntradasAlojamiento from './Component/EntradasAlojamiento';
import AdminStaff from './Component/AdminStaff';
import Reportes from './Component/Reportes';
import ParticipantesAdmin from './Component/ParticipantesAdmin';
import RegisterUser from './Component/RegisterUser';
import UserList from './Component/UserList';
import Voluntarios from './Component/Voluntarios';
import UserProfile from './Component/UserProfile';



const AppRoutes = () => {
  const { userRole } = useContext(UserContext); //  obtener el rol desde el contexto

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkin" element={<CheckinCheckout />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/participants" element={<Participantes />} />
        <Route path="/entries" element={<EntradasAlojamiento />} />
        <Route path="/staff-management" element={<AdminStaff />} />
        <Route path="/reports" element={<Reportes />} />
        <Route path="/participant-management" element={<ParticipantesAdmin />} />
        {userRole === 'admin' && (
          <Route path="/register-user" element={<RegisterUser />} />
        )}
        {userRole === 'admin' && (
  <Route path="/user-list" element={<UserList />} />
)}
<Route path="/voluntarios" element={<Voluntarios />} />

<Route path="/perfil" element={<UserProfile />} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;

