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
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute('sp_Participante_ReporteGeneral');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error al obtener el reporte general de participantes:', error);
    res.status(500).json({ message: 'Error al obtener el reporte' });
  }
};

module.exports = {
  asistencia,
  resumen,
  getReporteParticipantes
};
