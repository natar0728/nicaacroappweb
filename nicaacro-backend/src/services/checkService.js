const { getConnection, sql } = require('../config/db');

const registrarCheckIn = async ({ participante_id, staff_id, fecha_hora }) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('participante_id', sql.Int, participante_id)
    .input('staff_id', sql.Int, staff_id)
    .input('fecha_hora', sql.DateTime, fecha_hora)
    .execute('sp_CheckIn_Registrar');

  return result.recordset;
};

const registrarCheckOut = async ({ participante_id, staff_id, fecha_hora }) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('participante_id', sql.Int, participante_id)
    .input('staff_id', sql.Int, staff_id)
    .input('fecha_hora', sql.DateTime, fecha_hora)
    .execute('sp_CheckOut_Registrar');

  return result.recordset;
};

module.exports = {
  registrarCheckIn,
  registrarCheckOut
};
