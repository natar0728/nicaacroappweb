import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Modal, Button, Form } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

const StaffAdmin = () => {
  const [staffList, setStaffList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    rol_id: ''
  });

  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    obtenerStaff();
    obtenerRoles();
  }, []);

  const obtenerStaff = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff`, headers);
      setStaffList(response.data);
    } catch (error) {
      console.error('Error al obtener staff:', error);
    }
  };

  const obtenerRoles = async () => {
    try {
      const res = await axios.get(`${API_URL}/catalogos/rol`, headers);
      setRoles(res.data);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const abrirModal = (staff = null) => {
    setEditando(staff);
    if (staff) {
      setFormulario({
        nombre: staff.nombre,
        correo: staff.correo,
        telefono: staff.telefono,
        rol_id: staff.rol_id
      });
    } else {
      setFormulario({
        nombre: '',
        correo: '',
        telefono: '',
        rol_id: ''
      });
    }
    setShowModal(true);
  };

  const guardarStaff = async () => {
    try {
      if (editando) {
        await axios.put(`${API_URL}/staff/${editando.id_staff}`, formulario, headers);
      } else {
        await axios.post(`${API_URL}/staff`, formulario, headers);
      }
      setShowModal(false);
      obtenerStaff();
    } catch (error) {
      console.error('Error al guardar staff:', error);
    }
  };

  const eliminarStaff = async (id) => {
    if (window.confirm('¿Deseas eliminar este miembro del staff?')) {
      try {
        await axios.delete(`${API_URL}/staff/${id}`, headers);
        obtenerStaff();
      } catch (error) {
        console.error('Error al eliminar staff:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2>Gestión de Staff</h2>
        <Button className="mb-3" variant="success" onClick={() => abrirModal()}>
          Agregar Staff
        </Button>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s.id_staff}>
                  <td>{s.nombre}</td>
                  <td>{s.correo}</td>
                  <td>{s.telefono}</td>
                  <td>{s.nombre_rol}</td>
                  <td>
                    <Button size="sm" variant="primary" onClick={() => abrirModal(s)}>Editar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => eliminarStaff(s.id_staff)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para crear/editar staff */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? 'Editar Staff' : 'Nuevo Staff'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={formulario.nombre} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={formulario.correo} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control name="telefono" value={formulario.telefono} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select name="rol_id" value={formulario.rol_id} onChange={handleInputChange} required>
                  <option value="">Seleccione un rol</option>
                  {roles.map((r) => (
                    <option key={r.id_rol} value={r.id_rol}>
                      {r.nombre_rol}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={guardarStaff}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default StaffAdmin;

