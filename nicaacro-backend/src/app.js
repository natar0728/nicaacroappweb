const express = require("express");
const cors = require("cors");
require("dotenv").config();

//IMPORTANDO LAS RUTAS DE CADA UNA DE LAS FUNCIONALIDADES

const participanteRoutes = require("./routes/participanteRoutes");
const staffRoutes = require('./routes/staffRoutes');
const alojamientoRoutes = require('./routes/alojamientoRoutes');
const entradaRoutes = require('./routes/EntradaRoutes'); //Por alguna razon aunque le cambie el nombre sigue funcionando asi. si no funciona cambiar a entradaRoutes con e minuscula
const voluntarioRoutes = require('./routes/voluntarioRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const authRoutes = require('./routes/authRoutes');
const checkRoutes = require('./routes/checkRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas en funcionamiento
app.use('api/usuarios', usuariosRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/check', checkRoutes);
app.use('/api/participantes', participanteRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/alojamientos', alojamientoRoutes);
app.use('/api/entradas', entradaRoutes);
app.use('/api/voluntarios', voluntarioRoutes);
app.use('/api/catalogos', catalogoRoutes);
app.use('/api/reportes', reporteRoutes);


// Ruta raíz
app.get("/", (req, res) => {
  res.send("API NicaAcro en ejecución, YAY!!!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;