import React, { useState } from 'react';
import Navbar from './Navbar';

const Participantes = () => {
  const [listaParticipantes, setListaParticipantes] = useState([]);
  const [nuevoParticipante, setNuevoParticipante] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    edad: ''
  });

  const handleChange = (e) => {
    setNuevoParticipante({
      ...nuevoParticipante,
      [e.target.name]: e.target.value
    });
  };

  const agregarParticipante = () => {
    setListaParticipantes([...listaParticipantes, nuevoParticipante]);
    setNuevoParticipante({ nombre: '', correo: '', telefono: '', edad: '' });
    // const modal = window.bootstrap.Modal.getInstance(document.getElementById('modalParticipante'));
    // modal.hide();
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ backgroundColor: '#FAF3ED', minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center py-4">
          <h2 className="mb-0">Gestión de Participantes</h2>
          <button
            className="btn"
            style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px' }}
            data-bs-toggle="modal"
            data-bs-target="#modalParticipante"
          >
            + Agregar Participante
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead style={{ backgroundColor: '#F5E9DA' }}>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Edad</th>
              </tr>
            </thead>
            <tbody>
              {listaParticipantes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No hay participantes registrados.</td>
                </tr>
              ) : (
                listaParticipantes.map((p, i) => (
                  <tr key={i}>
                    <td>{p.nombre}</td>
                    <td>{p.correo}</td>
                    <td>{p.telefono}</td>
                    <td>{p.edad}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="modalParticipante" tabIndex="-1" aria-labelledby="modalParticipanteLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#F5E9DA' }}>
              <h5 className="modal-title" id="modalParticipanteLabel">Nuevo Participante</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={nuevoParticipante.nombre} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" name="correo" value={nuevoParticipante.correo} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="tel" className="form-control" name="telefono" value={nuevoParticipante.telefono} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Edad</label>
                  <input type="number" className="form-control" name="edad" value={nuevoParticipante.edad} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn" style={{ backgroundColor: '#4CAF50', color: 'white' }} onClick={agregarParticipante}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Participantes;
