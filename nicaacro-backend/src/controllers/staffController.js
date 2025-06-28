const staffService = require('../services/staffService');

const getAll = async (req, res) => {
  try {
    const result = await staffService.getAllStaff();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener staff', detail: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await staffService.getStaffById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Staff no encontrado' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno', detail: error.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevo = await staffService.createStaff(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear staff', detail: error.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizado = await staffService.updateStaff(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar staff', detail: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const eliminado = await staffService.deleteStaff(req.params.id);
    res.json(eliminado);
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar staff', detail: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
