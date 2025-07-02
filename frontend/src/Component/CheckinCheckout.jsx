import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Button } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

const CheckInCheckOut = () => {
  const [asistencias, setAsistencias] = useState([]);
  const token = localStorage.getItem('token');
  const staffId = localStorage.getItem('staff_id'); // <- asegúrate de guardar esto al hacer login

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    obtenerAsistencias();
  }, []);

  const obtenerAsistencias = async () => {
    try {
      const res = await axios.get(`${API_URL}/reportes/asistencia`, headers);
      setAsistencias(res.data);
    } catch (error) {
      console.error('Error al obtener asistencia:', error);
    }
  };

  const registrarCheckIn = async (id_participante) => {
    try {
      const body = {
        participante_id: id_participante,
        staff_id: parseInt(staffId),
        fecha_hora: new Date().toISOString()
      };
      await axios.post(`${API_URL}/check/checkin`, body, headers);
      obtenerAsistencias();
    } catch (error) {
      alert('Error al registrar Check-in:\n' + error.response?.data?.error || error.message);
    }
  };

  const registrarCheckOut = async (id_participante) => {
    try {
      const body = {
        participante_id: id_participante,
        staff_id: parseInt(staffId),
        fecha_hora: new Date().toISOString()
      };
      await axios.post(`${API_URL}/check/checkout`, body, headers);
      obtenerAsistencias();
    } catch (error) {
      alert('Error al registrar Check-out:\n' + error.response?.data?.error || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2 className="mb-4">Check-in / Check-out</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Participante</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((p) => (
                <tr key={p.id_participante}>
                  <td>{p.nombre}</td>
                  <td>{p.checkin_hora ? new Date(p.checkin_hora).toLocaleString() : '—'}</td>
                  <td>{p.checkout_hora ? new Date(p.checkout_hora).toLocaleString() : '—'}</td>
                  <td>
                    {!p.checkin_hora && (
                      <Button size="sm" variant="success" onClick={() => registrarCheckIn(p.id_participante)}>
                        Check-in
                      </Button>
                    )}
                    {p.checkin_hora && !p.checkout_hora && (
                      <Button size="sm" variant="danger" onClick={() => registrarCheckOut(p.id_participante)}>
                        Check-out
                      </Button>
                    )}
                    {p.checkin_hora && p.checkout_hora && (
                      <span className="text-success">✔️ Completado</span>
                    )}
                  </td>
                </tr>
              ))}
              {asistencias.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No hay participantes registrados aún.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CheckInCheckOut;
