const { getConnection } = require('../config/db');

const getRoles = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Roles_ListAll');
  return result.recordset;
};

const getPreferencias = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_PreferenciaDietetica_ListAll');
  return result.recordset;
};

const getTiposAlojamiento = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_TipoAlojamiento_ListAll');
  return result.recordset;
};
module.exports = {
  getRoles,
  getPreferencias,
  getTiposAlojamiento
};
