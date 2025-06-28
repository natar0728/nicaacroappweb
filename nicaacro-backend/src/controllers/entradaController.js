const entradaService = require('../services/entradaService');

const getAll = async (req, res) => {
  try {
    const entradas = await entradaService.getAllEntradas();
    res.json(entradas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener entradas', detail: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const entrada = await entradaService.getEntradaById(req.params.id);
    if (!entrada) return res.status(404).json({ message: 'Entrada no encontrada' });
    res.json(entrada);
  } catch (err) {
    res.status(500).json({ error: 'Error interno', detail: err.message });
  }
};

const create = async (req, res) => {
  try {
    const nueva = await entradaService.createEntrada(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear entrada', detail: err.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizada = await entradaService.updateEntrada(req.params.id, req.body);
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar entrada', detail: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const eliminada = await entradaService.deleteEntrada(req.params.id);
    res.json(eliminada);
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar entrada', detail: err.message });
  }
};

const reportePorParticipante = async (req, res) => {
  try {
    const reporte = await entradaService.getReportePorParticipante();
    res.json(reporte);
  } catch (err) {
    res.status(500).json({ error: 'Error al generar reporte', detail: err.message });
  }
};

const tiposEntrada = async (req, res) => {
  try {
    const tipos = await entradaService.getTiposEntrada();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tipos de entrada', detail: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reportePorParticipante,
  tiposEntrada
};
