const { getConnection, sql } = require('../config/db');

const getAllEntradas = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Entrada_ListAll');
  return result.recordset;
};

const getEntradaById = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Entrada_GetById');
  return result.recordset[0];
};

const createEntrada = async (data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('tipo_entrada_id', sql.Int, data.tipo_entrada_id)
    .input('participante_id', sql.Int, data.participante_id)
    .input('fecha_compra', sql.DateTime, data.fecha_compra)
    .execute('sp_Entrada_Insert');
  return result.recordset[0];
};

const updateEntrada = async (id, data) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('tipo_entrada_id', sql.Int, data.tipo_entrada_id)
    .input('fecha_compra', sql.DateTime, data.fecha_compra)
    .execute('sp_Entrada_Update');
  return result.recordset;
};

const deleteEntrada = async (id) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .execute('sp_Entrada_Delete');
  return result.recordset;
};

const getReportePorParticipante = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_Entrada_ReportePorParticipante');
  return result.recordset;
};

const getTiposEntrada = async () => {
  const pool = await getConnection();
  const result = await pool.request().execute('sp_TipoEntrada_ListAll');
  return result.recordset;
};

module.exports = {
  getAllEntradas,
  getEntradaById,
  createEntrada,
  updateEntrada,
  deleteEntrada,
  getReportePorParticipante,
  getTiposEntrada
};
