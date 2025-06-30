const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');
const authorizeRoles = require('../middlewares/checkRole');
//solo admin puede registrar gente
router.post('/login', verifyToken,authorizeRoles('Administrador', 'Organizador', 'Host'), controller.login);
router.post('/register', verifyToken,authorizeRoles('Administrador'), controller.register);

module.exports = router;
