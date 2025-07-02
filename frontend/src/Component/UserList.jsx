import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
const API_URL = 'http://localhost:3000/api'; // O el puerto correcto que uses

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre_usuario: '',
    password: '',
    staff_id: '',
    rol: '',
  });

  // Cargar usuarios al iniciar
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditado(usuario);
    setNuevoUsuario({
      nombre_usuario: usuario.nombre_usuario,
      password: '',
      staff_id: usuario.staff_id,
      rol: usuario.rol,
    });
    const modal = new window.bootstrap.Modal(document.getElementById('modalEditar'));
    modal.show();
  };

  const guardarCambios = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${usuarioEditado.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });
      if (response.ok) {
        obtenerUsuarios();
        setUsuarioEditado(null);
        const modal = window.bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
        modal.hide();
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        obtenerUsuarios();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Gestión de Usuarios</h2>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Staff ID</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No hay usuarios registrados</td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario.id_usuario}>
                    <td>{usuario.id_usuario}</td>
                    <td>{usuario.nombre_usuario}</td>
                    <td>{usuario.staff_id}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => abrirModalEditar(usuario)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(usuario.id_usuario)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edición */}
      <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="modalEditarLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title" id="modalEditarLabel">Editar Usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre de Usuario</label>
                  <input
                    type="text"
                    name="nombre_usuario"
                    value={nuevoUsuario.nombre_usuario}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nueva Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={nuevoUsuario.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Staff ID</label>
                  <input
                    type="number"
                    name="staff_id"
                    value={nuevoUsuario.staff_id}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <select
                    name="rol"
                    value={nuevoUsuario.rol}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="organizador">Organizador</option>
                    <option value="host">Host</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button className="btn btn-success" onClick={guardarCambios}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
