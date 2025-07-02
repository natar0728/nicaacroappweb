const { getConnection } = require('../config/db');

const getAsistencia = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Asistencia_Reporte');
  return result.recordset;
};

const getResumen = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Resumen_Estadisticas');
  return result.recordset[0]; // porque es un solo objeto
};

const obtenerReporteParticipantes = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute('sp_Participante_ReporteGeneral');
    return result.recordset;
  } catch (error) {
    throw new Error('Error al obtener el reporte de participantes: ' + error.message);
  }
};

module.exports = {
  getAsistencia,
  getResumen,
  obtenerReporteParticipantes
};
