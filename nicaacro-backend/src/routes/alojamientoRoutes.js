const express = require('express');
const router = express.Router();
const controller = require('../controllers/alojamientoController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

// Ruta base: /api/alojamientos
router.get('/', checkRole('Administrador', 'Organizador', 'Host'),controller.getAll);
router.get('/disponibilidad', checkRole('Administrador', 'Organizador', 'Host'), controller.disponibilidad);
router.get('/:id',checkRole('Administrador', 'Organizador', 'Host'),  controller.getById);
router.post('/crear', checkRole('Administrador', 'Organizador'), controller.create);
router.put('/:id', checkRole('Administrador', 'Organizador', 'Host'), controller.update);
router.delete('/:id', checkRole('Administrador'), controller.remove);

module.exports = router;
