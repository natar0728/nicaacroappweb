import React, { useState } from 'react';
import Navbar from './Navbar';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [nuevoStaff, setNuevoStaff] = useState({
    nombre: '',
    rol: '',
    correo: '',
    telefono: ''
  });

  const handleInputChange = (e) => {
    setNuevoStaff({
      ...nuevoStaff,
      [e.target.name]: e.target.value
    });
  };

const agregarStaff = () => {
  setStaffList([...staffList, nuevoStaff]);
  setNuevoStaff({ nombre: '', rol: '', correo: '', telefono: '' });
  // El modal se cerrará automáticamente si el botón de guardar tiene data-bs-dismiss="modal"
};

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ backgroundColor: '#FAF3ED', minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center py-4">
          <h2 className="mb-0">Gestión de Staff</h2>
          <button
            className="btn"
            style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px' }}
            data-bs-toggle="modal"
            data-bs-target="#agregarStaffModal"
          >
            + Agregar nuevo staff
          </button>
        </div>

        {/* Tabla de staff */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#F5E9DA' }}>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No hay staff registrado.</td>
                </tr>
              ) : (
                staffList.map((staff, index) => (
                  <tr key={index}>
                    <td>{staff.nombre}</td>
                    <td>{staff.rol}</td>
                    <td>{staff.correo}</td>
                    <td>{staff.telefono}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Agregar Nuevo Staff */}
      <div className="modal fade" id="agregarStaffModal" tabIndex="-1" aria-labelledby="agregarStaffModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#F5E9DA' }}>
              <h5 className="modal-title" id="agregarStaffModalLabel">Agregar Nuevo Staff</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={nuevoStaff.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rol"
                    value={nuevoStaff.rol}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    value={nuevoStaff.correo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="telefono"
                    value={nuevoStaff.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn" style={{ backgroundColor: '#4CAF50', color: 'white' }} onClick={agregarStaff}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;

