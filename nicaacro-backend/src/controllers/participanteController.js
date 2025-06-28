const participanteService = require('../services/participanteService');

const getAll = async (req, res) => {
  try {
    const participantes = await participanteService.getAllParticipantes();
    res.json(participantes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener participantes', detail: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const participante = await participanteService.getParticipanteById(req.params.id);
    if (!participante) return res.status(404).json({ message: 'Participante no encontrado' });
    res.json(participante);
  } catch (err) {
    res.status(500).json({ error: 'Error interno', detail: err.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevo = await participanteService.createParticipante(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear participante', detail: err.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizado = await participanteService.updateParticipante(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar participante', detail: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const eliminado = await participanteService.deleteParticipante(req.params.id);
    res.json(eliminado);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo eliminar participante', detail: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
