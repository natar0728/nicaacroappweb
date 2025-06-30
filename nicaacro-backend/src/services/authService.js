const { getConnection, sql } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async ({ nombre_usuario, password }) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
    .execute('sp_Usuario_Login'); 

  const user = result.recordset[0];
  if (!user) throw new Error('Usuario no encontrado');

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) throw new Error('Contraseña incorrecta');

  const token = jwt.sign({
    id: user.id_usuario,
    nombre_usuario: user.nombre_usuario,
    staff_id: user.staff_id,
    rol: user.nombre_rol
  }, process.env.JWT_SECRET, { expiresIn: '2h' });

  return { token, userId: user.id_usuario, rol: user.nombre_rol };
};

const register = async ({ nombre_usuario, password, staff_id }) => {
  const pool = await getConnection();

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  const exists = await pool.request()
    .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
    .query('SELECT 1 FROM Usuario WHERE nombre_usuario = @nombre_usuario');

  if (exists.recordset.length > 0) {
    throw new Error('El nombre de usuario ya está en uso');
  }

  const staff = await pool.request()
    .input('staff_id', sql.Int, staff_id)
    .query('SELECT 1 FROM Staff WHERE id_staff = @staff_id');

  if (staff.recordset.length === 0) {
    throw new Error('El Staff seleccionado no existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.request()
    .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
    .input('password_hash', sql.VarChar(255), hashedPassword)
    .input('staff_id', sql.Int, staff_id)
    .query(`
      INSERT INTO Usuario (nombre_usuario, password_hash, staff_id)
      VALUES (@nombre_usuario, @password_hash, @staff_id)
    `);

  return { message: 'Usuario registrado exitosamente' };
};

module.exports = { login, register };
