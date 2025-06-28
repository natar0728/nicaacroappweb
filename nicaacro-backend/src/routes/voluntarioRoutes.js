const express = require('express');
const router = express.Router();
const controller = require('../controllers/voluntarioController');

// Ruta base: /api/voluntarios
router.get('/', controller.getAll);
router.get('/reporte', controller.reporteOcupaciones);
router.get('/ocupaciones', controller.ocupaciones);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
