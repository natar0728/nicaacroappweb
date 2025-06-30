const express = require('express');
const router = express.Router();
const controller = require('../controllers/participanteController');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRoles = require('../middlewares/checkRole');

// Ruta base: /api/participantes
router.get('/', verifyToken,authorizeRoles('Administrador', 'Organizador', 'Host'), controller.getAll);
router.get('/:id', verifyToken, authorizeRoles('Administrador', 'Organizador', 'Host'), controller.getById);
router.post('/crear',verifyToken, authorizeRoles('Administrador', 'Organizador', 'Host'), controller.create);
router.put('/:id', verifyToken, authorizeRoles('Administrador', 'Organizador', 'Host'), controller.update);
router.delete('/:id', verifyToken, authorizeRoles('Administrador', 'Organizador', 'Host'),controller.remove);

module.exports = router;
