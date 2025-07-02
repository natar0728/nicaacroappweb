import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    password: '',
    staff_id: '',
    rol: 'organizador',
    id_usuario: null
  });

  const [usuarios, setUsuarios] = useState([]);
  const API = 'http://localhost:3000/api'; // Cambia si tu backend usa otra URL

  useEffect(() => {
    fetch(`${API}/usuarios`)
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al obtener usuarios:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id_usuario) {
      // Actualizar usuario
      fetch(`${API}/usuarios/${formData.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(() => {
          alert('Usuario actualizado');
          window.location.reload();
        })
        .catch(err => console.error('Error al actualizar:', err));
    } else {
      // Registrar nuevo usuario
      fetch(`${API}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(() => {
          alert('Usuario registrado');
          window.location.reload();
        })
        .catch(err => console.error('Error al registrar:', err));
    }
  };

  const editarUsuario = (user) => {
    setFormData({
      nombre_usuario: user.nombre_usuario,
      password: '', // el usuario puede ingresar nueva si desea
      staff_id: user.staff_id,
      rol: user.nombre_rol,
      id_usuario: user.id_usuario
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      fetch(`${API}/usuarios/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          alert('Usuario eliminado');
          setUsuarios(usuarios.filter(u => u.id_usuario !== id));
        })
        .catch(err => console.error('Error al eliminar usuario:', err));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2>{formData.id_usuario ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={formData.id_usuario ? 'Nueva contraseña (opcional)' : ''}
              required={!formData.id_usuario}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ID de Staff</label>
            <input
              type="number"
              className="form-control"
              name="staff_id"
              value={formData.staff_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              className="form-select"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="organizador">Organizador</option>
              <option value="host">Host</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">
            {formData.id_usuario ? 'Actualizar Usuario' : 'Registrar Usuario'}
          </button>
        </form>

        <hr className="my-5" />
        <h3>Usuarios Registrados</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead style={{ backgroundColor: '#F5E9DA' }}>
              <tr>
                <th>ID</th>
                <th>Nombre de Usuario</th>
                <th>Rol</th>
                <th>ID Staff</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No hay usuarios registrados.</td>
                </tr>
              ) : (
                usuarios.map((user) => (
                  <tr key={user.id_usuario}>
                    <td>{user.id_usuario}</td>
                    <td>{user.nombre_usuario}</td>
                    <td>{user.nombre_rol}</td>
                    <td>{user.staff_id}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => editarUsuario(user)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(user.id_usuario)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;

