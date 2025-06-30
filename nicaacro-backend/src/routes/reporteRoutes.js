const express = require('express');
const router = express.Router();
const controller = require('../controllers/reporteController');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRoles = require('../middlewares/checkRole');

router.get('/asistencia', verifyToken, authorizeRoles('Administrador'), controller.asistencia);
router.get('/resumen', verifyToken, authorizeRoles('Administrador'), controller.resumen);

module.exports = router;
