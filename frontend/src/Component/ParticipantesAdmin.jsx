import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

const ParticipantesAdmin = () => {
  const [participantes, setParticipantes] = useState([]);
  const [preferencias, setPreferencias] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [errorForm, setErrorForm] = useState('');
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    preferencia_id: '',
    alojamiento_id: ''
  });

  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    obtenerParticipantes();
    obtenerCatalogos();
  }, []);

  const obtenerParticipantes = async () => {
    try {
      const response = await axios.get(`${API_URL}/reportes/reporte-participantes`, headers);
      setParticipantes(response.data);
    } catch (error) {
      console.error('Error al obtener participantes:', error);
    }
  };

  const obtenerCatalogos = async () => {
    try {
      const [prefRes, alojRes] = await Promise.all([
        axios.get(`${API_URL}/catalogos/preferencia`, headers),
        axios.get(`${API_URL}/alojamientos/`, headers)
      ]);
      setPreferencias(prefRes.data);
      setAlojamientos(alojRes.data);
    } catch (error) {
      console.error('Error al obtener catálogos:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const abrirModal = (participante = null) => {
    setErrorForm('');
    setEditando(participante);
    if (participante) {
      setFormulario({
        nombre: participante.nombre,
        correo: participante.correo,
        telefono: participante.telefono,
        preferencia_id: participante.preferencia_id,
        alojamiento_id: participante.alojamiento_id
      });
    } else {
      setFormulario({
        nombre: '',
        correo: '',
        telefono: '',
        preferencia_id: '',
        alojamiento_id: ''
      });
    }
    setShowModal(true);
  };

  const validarFormulario = () => {
    if (!formulario.nombre || !formulario.correo || !formulario.telefono || !formulario.preferencia_id || !formulario.alojamiento_id) {
      setErrorForm('Todos los campos son obligatorios.');
      return false;
    }
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(formulario.correo)) {
      setErrorForm('El correo electrónico no es válido.');
      return false;
    }
    return true;
  };

  const guardarParticipante = async () => {
    if (!validarFormulario()) return;

    try {
      if (editando) {
        await axios.put(`${API_URL}/participantes/${editando.id_participante}`, formulario, headers);
      } else {
        await axios.post(`${API_URL}/participantes`, formulario, headers);
      }
      setShowModal(false);
      obtenerParticipantes();
    } catch (error) {
      console.error('Error al guardar participante:', error);
      setErrorForm('Error al guardar. Intenta nuevamente.');
    }
  };

  const eliminarParticipante = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este participante?')) {
      try {
        await axios.delete(`${API_URL}/participantes/${id}`, headers);
        obtenerParticipantes();
      } catch (error) {
        console.error('Error al eliminar participante:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h2>Gestión de Participantes</h2>
        <Button className="mb-3" variant="success" onClick={() => abrirModal()}>
          Agregar Participante
        </Button>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Preferencia</th>
                <th>Alojamiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {participantes.map((p) => (
                <tr key={p.id_participante}>
                  <td>{p.nombre}</td>
                  <td>{p.correo}</td>
                  <td>{p.telefono}</td>
                  <td>{p.nombre_preferencia}</td>
                  <td>{p.nombre_alojamiento}</td>
                  <td>
                    <Button size="sm" variant="primary" onClick={() => abrirModal(p)}>Editar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => eliminarParticipante(p.id_participante)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para agregar/editar */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? 'Editar Participante' : 'Nuevo Participante'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorForm && <Alert variant="danger">{errorForm}</Alert>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={formulario.nombre} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control name="correo" type="email" value={formulario.correo} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control name="telefono" value={formulario.telefono} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Preferencia</Form.Label>
                <Form.Select name="preferencia_id" value={formulario.preferencia_id} onChange={handleInputChange} required>
                  <option value="">Seleccione una preferencia</option>
                  {preferencias.map((p) => (
                    <option key={p.id_preferencia} value={p.id_preferencia}>{p.nombre_preferencia}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Alojamiento</Form.Label>
                <Form.Select name="alojamiento_id" value={formulario.alojamiento_id} onChange={handleInputChange} required>
                  <option value="">Seleccione un alojamiento</option>
                  {alojamientos.map((a) => (
                    <option key={a.id_alojamiento} value={a.id_alojamiento}>{a.nombre_alojamiento}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={guardarParticipante}>Guardar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ParticipantesAdmin;