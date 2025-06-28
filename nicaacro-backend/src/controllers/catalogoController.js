const catalogoService = require('../services/catalogoService');

const roles = async (req, res) => {
  try {
    const data = await catalogoService.getRoles();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener roles', detail: err.message });
  }
};

const preferencias = async (req, res) => {
  try {
    const data = await catalogoService.getPreferencias();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener preferencias', detail: err.message });
  }
};

const tiposAlojamiento = async (req, res) => {
  try {
    const data = await catalogoService.getTiposAlojamiento();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tipos de alojamiento', detail: err.message });
  }
};

module.exports = {
  roles,
  preferencias,
  tiposAlojamiento
};
