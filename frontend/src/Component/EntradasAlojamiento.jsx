import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Tabs, Tab, Modal, Button, Form } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

const EntradasYAlojamiento = () => {
  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  // ——— ENTRADAS ———
  const [entradas, setEntradas] = useState([]);
  const [tiposEntrada, setTiposEntrada] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [modalEntrada, setModalEntrada] = useState(false);
  const [editandoEntrada, setEditandoEntrada] = useState(null);
  const [formEntrada, setFormEntrada] = useState({
    participante_id: '',
    tipo_entrada_id: '',
    fecha_compra: '',
    pagado: false
  });

  // ——— ALOJAMIENTO (Asignaciones) ———
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [participantesConAlojamiento, setParticipantesConAlojamiento] = useState([]);
  const [modalAsignar, setModalAsignar] = useState(false);
  const [participanteSeleccionado, setParticipanteSeleccionado] = useState(null);
  const [nuevoAlojamiento, setNuevoAlojamiento] = useState('');

  useEffect(() => {
    // cargar todo al inicio
    obtenerEntradas();
    obtenerCatalogosEntradas();
    obtenerTiposAlojamiento();
    obtenerParticipantesConAlojamiento();
  }, []);

  // — Funciones Entradas —
  const obtenerEntradas = async () => {
    try {
      const res = await axios.get(`${API_URL}/entradas`, headers);
      setEntradas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const obtenerCatalogosEntradas = async () => {
    try {
      const [resTipos, resPart] = await Promise.all([
        axios.get(`${API_URL}/catalogos/entrada`, headers),
        axios.get(`${API_URL}/participantes`, headers)
      ]);
      setTiposEntrada(resTipos.data);
      setParticipantes(resPart.data);
    } catch (err) {
      console.error(err);
    }
  };

  const abrirModalEntrada = (e = null) => {
    setEditandoEntrada(e);
    if (e) {
      setFormEntrada({
        participante_id: e.id_participante,
        tipo_entrada_id: e.tipo_entrada_id,
        fecha_compra: e.fecha_compra.split('T')[0],
        pagado: e.pagado
      });
    } else {
      setFormEntrada({
        participante_id: '',
        tipo_entrada_id: '',
        fecha_compra: '',
        pagado: false
      });
    }
    setModalEntrada(true);
  };

  const handleChangeEntrada = ({ target }) => {
    const { name, value, type, checked } = target;
    setFormEntrada(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const guardarEntrada = async () => {
    try {
      if (editandoEntrada) {
        await axios.put(
          `${API_URL}/entradas/${editandoEntrada.id_entrada}`,
          formEntrada,
          headers
        );
      } else {
        await axios.post(`${API_URL}/entradas`, formEntrada, headers);
      }
      setModalEntrada(false);
      obtenerEntradas();
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarEntrada = async (id) => {
    if (!window.confirm('Eliminar esta entrada?')) return;
    try {
      await axios.delete(`${API_URL}/entradas/${id}`, headers);
      obtenerEntradas();
    } catch (err) {
      console.error(err);
    }
  };

  // — Funciones Alojamiento (Asignar) —
  const obtenerTiposAlojamiento = async () => {
    try {
      const res = await axios.get(`${API_URL}/catalogos/alojamiento`, headers);
      setTiposAlojamiento(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const obtenerParticipantesConAlojamiento = async () => {
    try {
      const res = await axios.get(`${API_URL}/reportes/participantes`, headers);
      setParticipantesConAlojamiento(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const abrirModalAsignar = (p) => {
    setParticipanteSeleccionado(p);
    setNuevoAlojamiento(p.alojamiento ? p.alojamiento_id : '');
    setModalAsignar(true);
  };

  const guardarAlojamientoParticipante = async () => {
    try {
      await axios.put(
        `${API_URL}/participantes/${participanteSeleccionado.id_participante}`,
        {
          nombre: participanteSeleccionado.nombre,
          correo: participanteSeleccionado.correo,
          telefono: participanteSeleccionado.telefono || '',
          preferencia_id: participanteSeleccionado.preferencia_id || null,
          alojamiento_id: nuevoAlojamiento || null
        },
        headers
      );
      setModalAsignar(false);
      obtenerParticipantesConAlojamiento();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <Tabs defaultActiveKey="entradas" className="mb-4" id="tabs-entradas-alojamiento">
          {/* — ENTRADAS — */}
          <Tab eventKey="entradas" title="Entradas">
            <Button variant="success" className="mb-3" onClick={() => abrirModalEntrada()}>
              Agregar Entrada
            </Button>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Participante</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Pagado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {entradas.map(e => (
                    <tr key={e.id_entrada}>
                      <td>{e.nombre_participante}</td>
                      <td>{e.tipo}</td>
                      <td>{e.fecha_compra.split('T')[0]}</td>
                      <td>{e.pagado ? 'Sí' : 'No'}</td>
                      <td>
                        <Button size="sm" variant="primary" onClick={() => abrirModalEntrada(e)}>
                          Editar
                        </Button>{' '}
                        <Button size="sm" variant="danger" onClick={() => eliminarEntrada(e.id_entrada)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>

          {/* — ALOJAMIENTO — */}
          <Tab eventKey="alojamiento" title="Alojamiento">
            <h5 className="mb-3">Participantes y Alojamiento</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Participante</th>
                    <th>Correo</th>
                    <th>Alojamiento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {participantesConAlojamiento.map(p => (
                    <tr key={p.id_participante}>
                      <td>{p.nombre}</td>
                      <td>{p.correo}</td>
                      <td>{p.alojamiento || 'Sin asignar'}</td>
                      <td>
                        <Button size="sm" variant="primary" onClick={() => abrirModalAsignar(p)}>
                          Asignar / Cambiar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>

        {/* Modal Entrada */}
        <Modal show={modalEntrada} onHide={() => setModalEntrada(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editandoEntrada ? 'Editar Entrada' : 'Nueva Entrada'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Participante</Form.Label>
                <Form.Select
                  name="participante_id"
                  value={formEntrada.participante_id}
                  onChange={handleChangeEntrada}
                  required
                >
                  <option value="">Seleccione...</option>
                  {participantes.map(p => (
                    <option key={p.id_participante} value={p.id_participante}>
                      {p.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Entrada</Form.Label>
                <Form.Select
                  name="tipo_entrada_id"
                  value={formEntrada.tipo_entrada_id}
                  onChange={handleChangeEntrada}
                  required
                >
                  <option value="">Seleccione...</option>
                  {tiposEntrada.map(t => (
                    <option key={t.id_tipo_entrada} value={t.id_tipo_entrada}>
                      {t.descripcion}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Compra</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_compra"
                  value={formEntrada.fecha_compra}
                  onChange={handleChangeEntrada}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Pagado"
                  name="pagado"
                  checked={formEntrada.pagado}
                  onChange={handleChangeEntrada}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalEntrada(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={guardarEntrada}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Asignar Alojamiento */}
        <Modal show={modalAsignar} onHide={() => setModalAsignar(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Asignar / Cambiar Alojamiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Alojamiento</Form.Label>
              <Form.Select
                value={nuevoAlojamiento}
                onChange={e => setNuevoAlojamiento(e.target.value)}
              >
                <option value="">Sin alojamiento</option>
                {tiposAlojamiento.map(a => (
                  <option key={a.id_alojamiento} value={a.id_alojamiento}>
                    {a.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalAsignar(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={guardarAlojamientoParticipante}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EntradasYAlojamiento;
