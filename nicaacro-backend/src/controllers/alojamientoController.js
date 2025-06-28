const alojamientoService = require('../services/alojamientoService');

const getAll = async (req, res) => {
  try {
    const alojamientos = await alojamientoService.getAllAlojamientos();
    res.json(alojamientos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener alojamientos', detail: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const alojamiento = await alojamientoService.getAlojamientoById(req.params.id);
    if (!alojamiento) return res.status(404).json({ message: 'Alojamiento no encontrado' });
    res.json(alojamiento);
  } catch (err) {
    res.status(500).json({ error: 'Error interno', detail: err.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevo = await alojamientoService.createAlojamiento(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear alojamiento', detail: err.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizado = await alojamientoService.updateAlojamiento(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar alojamiento', detail: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const eliminado = await alojamientoService.deleteAlojamiento(req.params.id);
    res.json(eliminado);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo eliminar alojamiento', detail: err.message });
  }
};

const disponibilidad = async (req, res) => {
  try {
    const reporte = await alojamientoService.getReporteDisponibilidad();
    res.json(reporte);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener disponibilidad', detail: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  disponibilidad
};
