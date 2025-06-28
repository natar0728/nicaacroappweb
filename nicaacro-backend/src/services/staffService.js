
const { getConnection, sql } = require('../config/db');

const getAllStaff = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Staff_ListAll');
  return result.recordset;
};

const getStaffById = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Staff_GetById');
  return result.recordset[0];
};

const createStaff = async (data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('nombre', sql.VarChar(100), data.nombre)
    .input('correo', sql.VarChar(100), data.correo)
    .input('telefono', sql.VarChar(20), data.telefono)
    .input('rol_id', sql.Int, data.rol_id)
    .execute('sp_PersonaYStaff_Insert');
  return result.recordset[0];
};

const updateStaff = async (id, data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id_staff', sql.Int, id)
    .input('nombre', sql.VarChar(100), data.nombre)
    .input('correo', sql.VarChar(100), data.correo)
    .input('telefono', sql.VarChar(20), data.telefono)
    .input('rol_id', sql.Int, data.rol_id)
    .execute('sp_Staff_Update');
  return result.recordset;
};

const deleteStaff = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Staff_Delete');
  return result.recordset;
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
};
