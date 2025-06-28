const { getConnection, sql } = require('../config/db');

const getAllAlojamientos = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Alojamiento_ListAll');
  return result.recordset;
};

const getAlojamientoById = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Alojamiento_GetById');
  return result.recordset[0];
};

const createAlojamiento = async (data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('nombre_lugar', sql.VarChar(100), data.nombre_lugar)
    .input('capacidad', sql.Int, data.capacidad)
    .input('ubicacion', sql.VarChar(100), data.ubicacion)
    .input('tipo_alojamiento_id', sql.Int, data.tipo_alojamiento_id)
    .execute('sp_Alojamiento_Insert');
  return result.recordset[0];
};

const updateAlojamiento = async (id, data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('nombre_lugar', sql.VarChar(100), data.nombre_lugar)
    .input('capacidad', sql.Int, data.capacidad)
    .input('ubicacion', sql.VarChar(100), data.ubicacion)
    .input('tipo_alojamiento_id', sql.Int, data.tipo_alojamiento_id)
    .execute('sp_Alojamiento_Update');
  return result.recordset;
};

const deleteAlojamiento = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Alojamiento_Delete');
  return result.recordset;
};

const getReporteDisponibilidad = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Alojamiento_ReporteDisponibilidad');
  return result.recordset;
};

module.exports = {
  getAllAlojamientos,
  getAlojamientoById,
  createAlojamiento,
  updateAlojamiento,
  deleteAlojamiento,
  getReporteDisponibilidad
};
