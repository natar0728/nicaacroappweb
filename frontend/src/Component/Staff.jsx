import React, { useState } from 'react';
import Navbar from './Navbar';

/* global bootstrap */

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [nuevoStaff, setNuevoStaff] = useState({ nombre: '', rol: '', correo: '', telefono: '' });
  const [staffEditando, setStaffEditando] = useState(null);
  const [staffAEliminar, setStaffAEliminar] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (staffEditando) {
      setStaffEditando({ ...staffEditando, [name]: value });
    } else {
      setNuevoStaff({ ...nuevoStaff, [name]: value });
    }
  };

  const agregarStaff = () => {
    setStaffList([...staffList, nuevoStaff]);
    setNuevoStaff({ nombre: '', rol: '', correo: '', telefono: '' });
    const modal = bootstrap.Modal.getInstance(document.getElementById('agregarStaffModal'));
    modal.hide();
  };

  const guardarEdicion = () => {
    const actualizada = staffList.map((s, i) => (i === staffEditando.index ? staffEditando : s));
    setStaffList(actualizada);
    setStaffEditando(null);
    const modal = bootstrap.Modal.getInstance(document.getElementById('editarStaffModal'));
    modal.hide();
  };

  const eliminarStaff = () => {
    const nuevaLista = staffList.filter((_, i) => i !== staffAEliminar);
    setStaffList(nuevaLista);
    setStaffAEliminar(null);
    const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarStaffModal'));
    modal.hide();
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ backgroundColor: '#FAF3ED', minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center py-4">
          <h2>Gestión de Staff</h2>
          <button
            className="btn"
            style={{ backgroundColor: '#4CAF50', color: 'white' }}
            data-bs-toggle="modal"
            data-bs-target="#agregarStaffModal"
          >
            + Agregar nuevo staff
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#F5E9DA' }}>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No hay staff registrado.</td></tr>
              ) : (
                staffList.map((staff, index) => (
                  <tr key={index}>
                    <td>{staff.nombre}</td>
                    <td>{staff.rol}</td>
                    <td>{staff.correo}</td>
                    <td>{staff.telefono}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editarStaffModal"
                        onClick={() => setStaffEditando({ ...staff, index })}
                      >
                        Editar
                      </button>
                      <button className="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#eliminarStaffModal"
                        onClick={() => setStaffAEliminar(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar */}
      <div className="modal fade" id="agregarStaffModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title">Agregar Staff</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <input name="nombre" placeholder="Nombre" className="form-control mb-2" value={nuevoStaff.nombre} onChange={handleInputChange} />
              <input name="rol" placeholder="Rol" className="form-control mb-2" value={nuevoStaff.rol} onChange={handleInputChange} />
              <input name="correo" type="email" placeholder="Correo" className="form-control mb-2" value={nuevoStaff.correo} onChange={handleInputChange} />
              <input name="telefono" placeholder="Teléfono" className="form-control" value={nuevoStaff.telefono} onChange={handleInputChange} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-success" onClick={agregarStaff}>Guardar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Editar */}
      <div className="modal fade" id="editarStaffModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-warning-subtle">
              <h5 className="modal-title">Editar Staff</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              {staffEditando && (
                <>
                  <input name="nombre" className="form-control mb-2" value={staffEditando.nombre} onChange={handleInputChange} />
                  <input name="rol" className="form-control mb-2" value={staffEditando.rol} onChange={handleInputChange} />
                  <input name="correo" className="form-control mb-2" value={staffEditando.correo} onChange={handleInputChange} />
                  <input name="telefono" className="form-control" value={staffEditando.telefono} onChange={handleInputChange} />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-success" onClick={guardarEdicion}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Eliminar */}
      <div className="modal fade" id="eliminarStaffModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger-subtle">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">¿Estás seguro que deseas eliminar este staff?</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-danger" onClick={eliminarStaff}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
