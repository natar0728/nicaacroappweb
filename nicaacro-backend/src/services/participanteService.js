const { getConnection, sql } = require('../config/db');

const getAllParticipantes = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Participante_ListAll');
  return result.recordset;
};

const getParticipanteById = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Participante_GetById');
  return result.recordset[0];
};

const createParticipante = async (data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('nombre', sql.VarChar(100), data.nombre)
    .input('correo', sql.VarChar(100), data.correo)
    .input('telefono', sql.VarChar(20), data.telefono)
    .input('preferencia_id', sql.Int, data.preferencia_id)
    .input('alojamiento_id', sql.Int, data.alojamiento_id)
    .execute('sp_PersonaYParticipante_Insert');
  return result.recordset[0];
};

const updateParticipante = async (id, data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id_participante', sql.Int, id)
    .input('nombre', sql.VarChar(100), data.nombre)
    .input('correo', sql.VarChar(100), data.correo)
    .input('telefono', sql.VarChar(20), data.telefono)
    .input('preferencia_id', sql.Int, data.preferencia_id)
    .input('alojamiento_id', sql.Int, data.alojamiento_id)
    .execute('sp_Participante_UpdateCompleto');
  return result.recordset[0];
};

const deleteParticipante = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Participante_Delete');
  return result.recordset[0];
};

module.exports = {
  getAllParticipantes,
  getParticipanteById,
  createParticipante,
  updateParticipante,
  deleteParticipante
};
