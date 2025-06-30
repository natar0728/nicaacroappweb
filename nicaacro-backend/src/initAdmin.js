// const app = require('./app');
// require('dotenv').config();
// const { getConnection, sql } = require('./config/db');
// const bcrypt = require('bcrypt');

// //const createAdminUser = async () => {
//   try {
//     const pool = await getConnection();

//     const nombre_usuario = 'admin';
//     const password = 'admin123'; // Cámbialo luego
//     const staff_id = 1; // Asegúrate de que exista este staff
//     const password_hash = await bcrypt.hash(password, 10);

//     // Verifica si ya existe el usuario
//     const existing = await pool.request()
//       .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
//       .query('SELECT * FROM Usuario WHERE nombre_usuario = @nombre_usuario');

//     if (existing.recordset.length > 0) {
//       console.log('🟡 El usuario admin ya existe.');
//       return;
//     }

//     // Inserta el usuario
//     await pool.request()
//       .input('nombre_usuario', sql.VarChar(50), nombre_usuario)
//       .input('password_hash', sql.VarChar(255), password_hash)
//       .input('staff_id', sql.Int, staff_id)
//       .query(`
//         INSERT INTO Usuario (nombre_usuario, password_hash, staff_id)
//         VALUES (@nombre_usuario, @password_hash, @staff_id)
//       `);

//     console.log('✅ Usuario admin creado correctamente.');
//   } catch (err) {
//     console.error('❌ Error al crear el usuario admin:', err);
//   }
// //};

// //createAdminUser();
