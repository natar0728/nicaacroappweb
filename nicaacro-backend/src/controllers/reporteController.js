const reporteService = require('../services/reporteService');

const asistencia = async (req, res) => {
  try {
    const data = await reporteService.getAsistencia();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener asistencia', detail: err.message });
  }
};

const resumen = async (req, res) => {
  try {
    const data = await reporteService.getResumen();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener resumen', detail: err.message });
  }
};

const getReporteParticipantes = async (req, res) => {
  try {
    const data = await reporteService.obtenerReporteParticipantes();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  asistencia,
  resumen,
  getReporteParticipantes
};
