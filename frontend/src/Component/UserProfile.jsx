import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Modal, Button, Form } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [staff, setStaff] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre_usuario: '',
    password: '',
    staff_id: '',
    rol: ''
  });

  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    obtenerUsuarios();
    obtenerStaff();
    obtenerRoles();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/usuarios`, headers);
      setUsuarios(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };

  const obtenerStaff = async () => {
    try {
      const res = await axios.get(`${API_URL}/catalogos/staff`, headers);
      setStaff(res.data);
    } catch (err) {
      console.error('Error al obtener staff:', err);
    }
  };

  const obtenerRoles = async () => {
    try {
      const res = await axios.get(`${API_URL}/catalogos/roles`, headers);
      setRoles(res.data);
    } catch (err) {
      console.error('Error al obtener roles:', err);
    }
  };

  const abrirModal = (u = null) => {
    setEditando(u);
    if (u) {
      setFormulario({
        nombre_usuario: u.nombre_usuario,
        password: '',
        staff_id: u.staff_id,
        rol: u.nombre_rol
      });
    } else {
      setFormulario({
        nombre_usuario: '',
        password: '',
        staff_id: '',
        rol: ''
      });
    }
    setModalVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const guardarUsuario = async () => {
    try {
      const payload = {
        nombre_usuario: formulario.nombre_usuario,
        password: formulario.password,
        staff_id: parseInt(formulario.staff_id),
        rol: formulario.rol
      };

      if (editando) {
        await axios.put(`${API_URL}/usuarios/${editando.id_usuario}`, payload, headers);
      } else {
        await axios.post(`${API_URL}/usuarios`, payload, headers);
      }

      setModalVisible(false);
      obtenerUsuarios();
    } catch (err) {
      alert('Error al guardar usuario: ' + (err.response?.data?.error || err.message));
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await axios.delete(`${API_URL}/usuarios/${id}`, headers);
      obtenerUsuarios();
    } catch (err) {
      alert('Error al eliminar: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2>Gestión de Usuarios</h2>
        <Button className="mb-3" variant="success" onClick={() => abrirModal()}>
          Crear Usuario
        </Button>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Staff</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id_usuario}>
                  <td>{u.nombre_usuario}</td>
                  <td>{u.nombre_staff}</td>
                  <td>{u.nombre_rol}</td>
                  <td>
                    <Button size="sm" variant="primary" onClick={() => abrirModal(u)}>Editar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => eliminarUsuario(u.id_usuario)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No hay usuarios registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  name="nombre_usuario"
                  value={formulario.nombre_usuario}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formulario.password}
                  onChange={handleChange}
                  required={!editando} // Requerida solo si es nuevo
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Staff</Form.Label>
                <Form.Select
                  name="staff_id"
                  value={formulario.staff_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione staff</option>
                  {staff.map((s) => (
                    <option key={s.id_staff} value={s.id_staff}>
                      {s.nombre_staff}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  name="rol"
                  value={formulario.rol}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione rol</option>
                  {roles.map((r) => (
                    <option key={r.id_rol} value={r.nombre_rol}>
                      {r.nombre_rol}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalVisible(false)}>Cancelar</Button>
            <Button variant="primary" onClick={guardarUsuario}>Guardar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminUsuarios;

