import React, { useState } from 'react';
import Navbar from './Navbar';
//Probando lo de las peticiones a la API
const API = process.env.REACT_APP_API_URL;

fetch(`${API}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre_usuario: 'admin',
    password: 'admin123'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    localStorage.setItem('token', data.token); // guarda el token
  });
//Fin de probando
const AdminStaff = () => {
  const [staffData, setStaffData] = useState([
    { nombre: 'Carlos Rivas', rol: 'Coordinador', correo: 'carlos@nicaacro.com' },
    { nombre: 'Elena Ruiz', rol: 'Soporte', correo: 'elena@nicaacro.com' }
  ]);

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ backgroundColor: '#FAF3ED', minHeight: '100vh' }}>
        <h2 className="mb-4">Administrador de Staff</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead style={{ backgroundColor: '#F5E9DA' }}>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, index) => (
                <tr key={index}>
                  <td>{staff.nombre}</td>
                  <td>{staff.rol}</td>
                  <td>{staff.correo}</td>
                  <td>
                    <button className="btn btn-sm btn-success me-2">
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {staffData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No hay registros de staff.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminStaff;
