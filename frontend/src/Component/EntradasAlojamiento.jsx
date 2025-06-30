import React, { useState } from 'react';
import Navbar from './Navbar';

const EntradasAlojamiento = () => {
  const [entradas, setEntradas] = useState([
    { nombre: 'Juan Pérez', tipo: 'General', alojamiento: 'Hostal El Lago', estado: 'Confirmado' },
    { nombre: 'Ana Gómez', tipo: 'VIP', alojamiento: 'Hotel Central', estado: 'Pendiente' },
  ]);

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <h2 className="mb-4">Entradas y Alojamiento</h2>

        <div className="row">
          {entradas.map((entrada, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow-sm" style={{ backgroundColor: '#EFEBE9' }}>
                <div className="card-body">
                  <h5 className="card-title">{entrada.nombre}</h5>
                  <p className="card-text">
                    <strong>Tipo de Entrada:</strong> {entrada.tipo}<br />
                    <strong>Alojamiento:</strong> {entrada.alojamiento}<br />
                    <strong>Estado:</strong>{' '}
                    <span
                      className={`badge ${
                        entrada.estado === 'Confirmado'
                          ? 'bg-success'
                          : entrada.estado === 'Pendiente'
                          ? 'bg-warning text-dark'
                          : 'bg-secondary'
                      }`}
                    >
                      {entrada.estado}
                    </span>
                  </p>
                  {/* Puedes agregar botones de acción si se requiere más funcionalidad */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EntradasAlojamiento;
