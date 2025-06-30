const express = require('express');
const router = express.Router();
const controller = require('../controllers/voluntarioController');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRoles = require('../middlewares/checkRole');

// Ruta base: /api/voluntarios
router.get('/', verifyToken, authorizeRoles('Administrador', 'Organizador'), controller.getAll);
router.get('/reporte', verifyToken, authorizeRoles('Administrador', 'Organizador'), controller.reporteOcupaciones);
router.get('/ocupaciones', verifyToken, authorizeRoles('Administrador', 'Organizador'), controller.ocupaciones);
router.get('/:id',verifyToken, authorizeRoles('Administrador', 'Organizador'), controller.getById);
router.post('/crear', verifyToken, authorizeRoles('Administrador', 'Organizador'),controller.create);
router.put('/:id',verifyToken, authorizeRoles('Administrador', 'Organizador'), controller.update);
router.delete('/:id',verifyToken, authorizeRoles('Administrador', 'Organizador'), controller.remove);

module.exports = router;
