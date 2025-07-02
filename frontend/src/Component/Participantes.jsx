import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const API_URL = process.env.REACT_APP_API_URL;

const ReporteParticipantes = () => {
  const [participantes, setParticipantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await fetch(`${API_URL}/participante`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos de participantes.');
        }

        const data = await response.json();
        setParticipantes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchParticipantes();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-4">
        <h2 className="mb-4">Reporte General de Participantes</h2>

        {cargando && <div className="alert alert-info">Cargando participantes...</div>}
        {error && <div className="alert alert-danger">Error: {error}</div>}

        {!cargando && participantes.length === 0 && (
          <div className="alert alert-warning">No hay participantes registrados.</div>
        )}

        {!cargando && participantes.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Preferencia</th>
                  <th>Alojamiento</th>
                  <th>Ubicación</th>
                  <th>Capacidad</th>
                </tr>
              </thead>
              <tbody>
                {participantes.map((p) => (
                  <tr key={p.id_participante}>
                    <td>{p.nombre}</td>
                    <td>{p.correo}</td>
                    <td>{p.telefono || 'N/A'}</td>
                    <td>{p.preferencia || 'No especificada'}</td>
                    <td>{p.alojamiento || 'Sin alojamiento'}</td>
                    <td>{p.ubicacion || '-'}</td>
                    <td>{p.capacidad || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ReporteParticipantes;

