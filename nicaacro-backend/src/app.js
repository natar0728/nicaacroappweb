const express = require("express");
const cors = require("cors");
require("dotenv").config();

const participanteRoutes = require("./routes/participanteRoutes");
const staffRoutes = require('./routes/staffRoutes');
const alojamientoRoutes = require('./routes/alojamientoRoutes');
//const entradaRoutes = require('./routes/entradaRoutes');
const voluntarioRoutes = require('./routes/voluntarioRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/participantes', participanteRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/alojamientos', alojamientoRoutes);
app.use('/api/entradas', entradaRoutes);
app.use('/api/voluntarios', voluntarioRoutes);
app.use('/api/catalogos', catalogoRoutes);
app.use('/api/reportes', reporteRoutes);


// Ruta raíz
app.get("/", (req, res) => {
  res.send("✅ API NicaAcro en ejecución");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;