const express = require('express');
const router = express.Router();
const controller = require('../controllers/reporteController');

router.get('/asistencia', controller.asistencia);
router.get('/resumen', controller.resumen);

module.exports = router;
