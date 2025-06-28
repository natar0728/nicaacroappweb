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

module.exports = {
  getAsistencia,
  getResumen
};
