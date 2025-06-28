const express = require('express');
const router = express.Router();
const controller = require('../controllers/entradaController');

// Ruta base: /api/entradas
router.get('/', controller.getAll);
router.get('/tipos', controller.tiposEntrada);
router.get('/reporte', controller.reportePorParticipante);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
