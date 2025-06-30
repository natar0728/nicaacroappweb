import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Home from './Component/Home';
import CheckinCheckout from './Component/CheckinCheckout';
import Staff from './Component/Staff';
import Participantes from './Component/Participantes';
import EntradasAlojamiento from './Component/EntradasAlojamiento';
import AdminStaff from './Component/AdminStaff';
import Reportes from './Component/Reportes';
import ParticipantesAdmin from './Component/ParticipantesAdmin';

const AppRoutes = () => {
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
      </Routes>
    </Router>
  );
};

export default AppRoutes;
