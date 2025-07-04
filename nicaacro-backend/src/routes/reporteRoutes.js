const express = require('express');
const router = express.Router();
const controller = require('../controllers/reporteController');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRoles = require('../middlewares/checkRole');

//ruta base: /api/reportes
router.get('/asistencia', verifyToken, authorizeRoles('Administrador'), controller.asistencia);
router.get('/resumen', verifyToken, authorizeRoles('Administrador'), controller.resumen);
router.get('/reporte-participantes', verifyToken, authorizeRoles('Administrador', 'Organizador'), controller.getReporteParticipantes);

module.exports = router;
