const express = require('express');
const router = express.Router();
const controller = require('../controllers/catalogoController');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRoles = require('../middlewares/checkRole');
//ruta base : catalogos
router.get('/roles', verifyToken,authorizeRoles('Administrador', 'Organizador', 'Host'), controller.roles);
router.get('/preferencias', verifyToken,authorizeRoles('Administrador', 'Organizador', 'Host'), controller.preferencias);
router.get('/tipo-alojamiento',verifyToken,authorizeRoles('Administrador', 'Organizador', 'Host'), controller.tiposAlojamiento);

module.exports = router;
