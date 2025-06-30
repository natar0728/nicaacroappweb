const { getConection, sql } = require('../config/db');

const getAll = async () => {
  const pool = await getConection();
  const result = await pool.request().execute('sp_Usuario_Listar');
  return result.recordset;
};

const update = async (id, { nombre_usuario, staff_id }) => {
  const pool = await getConection();
  await pool.request()
    .input('id_usuario', sql.Int, id)
    .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
    .input('staff_id', sql.Int, staff_id)
    .execute('sp_Usuario_Actualizar');
};

const remove = async (id) => {
  const pool = await getConection();
  await pool.request()
    .input('id_usuario', sql.Int, id)
    .execute('sp_Usuario_Eliminar');
};

module.exports = { getAll, update, remove };