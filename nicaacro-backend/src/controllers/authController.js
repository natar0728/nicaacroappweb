const sql = require("mssql");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt");
const { getConection } = require("../config/db");

//login a la app
const login = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;
  //conexion a partir de una sp
  try {
    const pool = await getConection();
    const result = await pool
      .request()
      .input("nombre_usuario", sql.VarChar, nombre_usuario)
      .execute("sp_Usuario_Login");

    const user = result.recordset[0];
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const validPass = await bcrypt.compare(contraseña, user.password_hash);
    if (!validPass) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = generateToken({
      id: user.id_usuario,
      rol: user.nombre_rol,
      nombre: user.nombre_usuario
    });

    res.json({ token });

  } catch (error) {
    console.error("Error de login:", error);
    res.status(500).json({ msg: "Error interno" });
  }
};

const register = async (req, res) => {
  const { nombre_usuario, password, staff_id } = req.body;

  if (!nombre_usuario || !password || !staff_id) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const result = await authService.register({ nombre_usuario, password, staff_id });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { login, register };
