import React from 'react';
import Navbar from '../Component/Navbar';

const CheckinCheckout = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2 className="mb-4">Check-in / Check-out</h2>

        {/* Formulario de búsqueda */}
        <div className="card p-4 mb-4 shadow-sm">
          <form>
            <div className="mb-3">
              <label htmlFor="search" className="form-label">Buscar por nombre o ID</label>
              <input type="text" className="form-control" id="search" placeholder="Ej. Juan Pérez o 123" />
            </div>
            <button type="submit" className="btn btn-success">Buscar</button>
          </form>
        </div>

        {/* Tabla de resultados */}
        <div className="card shadow-sm p-3">
          <h5 className="mb-3">Participantes encontrados</h5>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>ID</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {/* Simulación de filas */}
              <tr>
                <td>Juan Pérez</td>
                <td>123</td>
                <td><span className="badge bg-success">Check-in</span></td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Check-out</button>
                  <button className="btn btn-primary btn-sm">Ver detalles</button>
                </td>
              </tr>
              <tr>
                <td>María López</td>
                <td>456</td>
                <td><span className="badge bg-secondary">Pendiente</span></td>
                <td>
                  <button className="btn btn-success btn-sm me-2">Check-in</button>
                  <button className="btn btn-primary btn-sm">Ver detalles</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CheckinCheckout;
