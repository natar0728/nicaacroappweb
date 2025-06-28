const { getConnection, sql } = require('../config/db');

const getAllVoluntarios = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Voluntario_ListAll');
  return result.recordset;
};

const getVoluntarioById = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Voluntario_GetById');
  return result.recordset[0];
};

const createVoluntario = async (data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('nombre', sql.VarChar(100), data.nombre)
    .input('correo', sql.VarChar(100), data.correo)
    .input('telefono', sql.VarChar(20), data.telefono)
    .execute('sp_PersonaYVoluntario_Insert');
  return result.recordset[0];
};

const updateVoluntario = async (id, data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id_voluntario', sql.Int, id)
    .input('nombre', sql.VarChar(100), data.nombre)
    .input('correo', sql.VarChar(100), data.correo)
    .input('telefono', sql.VarChar(20), data.telefono)
    .input('ocupaciones', sql.NVarChar(sql.MAX), data.ocupaciones) // coma separadas: "1,2,3"
    .execute('sp_Voluntario_UpdateCompletoConOcupaciones');
  return result.recordset[0];
};

const deleteVoluntario = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Voluntario_Delete');
  return result.recordset;
};

const getReporteConOcupaciones = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Voluntario_ReporteConOcupaciones');
  return result.recordset;
};

const getOcupaciones = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_OcupacionVoluntario_ListAll');
  return result.recordset;
};

module.exports = {
  getAllVoluntarios,
  getVoluntarioById,
  createVoluntario,
  updateVoluntario,
  deleteVoluntario,
  getReporteConOcupaciones,
  getOcupaciones
};
