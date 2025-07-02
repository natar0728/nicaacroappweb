import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Modal, Button, Form } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

const VoluntariosAdmin = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [ocupaciones, setOcupaciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    ocupaciones: []
  });

  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    obtenerVoluntarios();
    obtenerOcupaciones();
  }, []);

  const obtenerVoluntarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/voluntarios`, headers);
      setVoluntarios(res.data);
    } catch (err) {
      console.error('Error al obtener voluntarios:', err);
    }
  };

  const obtenerOcupaciones = async () => {
    try {
      const res = await axios.get(`${API_URL}/catalogos/ocupaciones`, headers);
      setOcupaciones(res.data);
    } catch (err) {
      console.error('Error al obtener ocupaciones:', err);
    }
  };

  const abrirModal = (v = null) => {
    setEditando(v);
    if (v) {
      setFormulario({
        nombre: v.nombre,
        correo: v.correo,
        telefono: v.telefono,
        ocupaciones: v.ocupaciones?.split(', ').map(o => obtenerIdOcupacionPorNombre(o)) || []
      });
    } else {
      setFormulario({ nombre: '', correo: '', telefono: '', ocupaciones: [] });
    }
    setModalVisible(true);
  };

  const obtenerIdOcupacionPorNombre = (nombre) => {
    const found = ocupaciones.find(o => o.descripcion === nombre.trim());
    return found ? found.id_ocupacion : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleOcupacionesChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map(opt => opt.value);
    setFormulario({ ...formulario, ocupaciones: values });
  };

  const guardarVoluntario = async () => {
    try {
      const payload = {
        nombre: formulario.nombre,
        correo: formulario.correo,
        telefono: formulario.telefono,
        ocupaciones: formulario.ocupaciones.join(',') // formato requerido por el SP
      };

      if (editando) {
        await axios.put(`${API_URL}/voluntarios/${editando.id_voluntario}`, payload, headers);
      } else {
        await axios.post(`${API_URL}/voluntarios`, payload, headers);
      }

      setModalVisible(false);
      obtenerVoluntarios();
    } catch (err) {
      alert('Error al guardar voluntario: ' + (err.response?.data?.error || err.message));
    }
  };

  const eliminarVoluntario = async (id) => {
    if (!window.confirm('¿Eliminar voluntario?')) return;
    try {
      await axios.delete(`${API_URL}/voluntarios/${id}`, headers);
      obtenerVoluntarios();
    } catch (err) {
      alert('Error al eliminar: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2>Gestión de Voluntarios</h2>
        <Button className="mb-3" variant="success" onClick={() => abrirModal()}>
          Agregar Voluntario
        </Button>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Ocupaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {voluntarios.map((v) => (
                <tr key={v.id_voluntario}>
                  <td>{v.nombre}</td>
                  <td>{v.correo}</td>
                  <td>{v.telefono}</td>
                  <td>{v.ocupaciones}</td>
                  <td>
                    <Button size="sm" variant="primary" onClick={() => abrirModal(v)}>Editar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => eliminarVoluntario(v.id_voluntario)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
              {voluntarios.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No hay voluntarios registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal de Voluntario */}
        <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? 'Editar Voluntario' : 'Nuevo Voluntario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={formulario.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="correo" value={formulario.correo} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control name="telefono" value={formulario.telefono} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ocupaciones</Form.Label>
                <Form.Select multiple value={formulario.ocupaciones} onChange={handleOcupacionesChange}>
                  {ocupaciones.map((o) => (
                    <option key={o.id_ocupacion} value={o.id_ocupacion}>
                      {o.descripcion}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalVisible(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={guardarVoluntario}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default VoluntariosAdmin;
