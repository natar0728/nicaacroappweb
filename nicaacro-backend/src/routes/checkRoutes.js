const express = require('express');
const router = express.Router();
const checkController = require('../controllers/checkController');
const verificarToken = require('../middlewares/verifyToken');
const verificarRol = require('../middlewares/checkRole');

// Solo organizador, host y admin pueden hacer check-in / check-out
const rolesPermitidos = ['Administrador', 'Organizador', 'Host'];

router.post('/checkin', verificarToken, verificarRol(rolesPermitidos), checkController.registrarCheckIn);
router.post('/checkout', verificarToken, verificarRol(rolesPermitidos), checkController.registrarCheckOut);

module.exports = router;
