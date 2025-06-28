const express = require('express');
const router = express.Router();
const controller = require('../controllers/alojamientoController');

// Ruta base: /api/alojamientos
router.get('/', controller.getAll);
router.get('/disponibilidad', controller.disponibilidad);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
