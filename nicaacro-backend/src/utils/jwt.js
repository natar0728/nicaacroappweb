const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Extrae el rol como texto directamente
  const payload = {
    id: user.id_usuario,
    username: user.nombre_usuario,
    rol: user.rol // <- asegúrate de que esto sea un string como "Administrador"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
};

module.exports = generateToken;