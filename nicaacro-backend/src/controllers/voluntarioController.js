const voluntarioService = require('../services/voluntarioService');

const getAll = async (req, res) => {
  try {
    const result = await voluntarioService.getAllVoluntarios();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener voluntarios', detail: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await voluntarioService.getVoluntarioById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Voluntario no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno', detail: error.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevo = await voluntarioService.createVoluntario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear voluntario', detail: error.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizado = await voluntarioService.updateVoluntario(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar voluntario', detail: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const eliminado = await voluntarioService.deleteVoluntario(req.params.id);
    res.json(eliminado);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar voluntario', detail: error.message });
  }
};

const reporteOcupaciones = async (req, res) => {
  try {
    const reporte = await voluntarioService.getReporteConOcupaciones();
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte', detail: error.message });
  }
};

const ocupaciones = async (req, res) => {
  try {
    const lista = await voluntarioService.getOcupaciones();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ocupaciones', detail: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reporteOcupaciones,
  ocupaciones
};
