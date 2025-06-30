const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

router.get('/', verifyToken, checkRole('Administrador'), controller.getAll);
router.put('/:id', verifyToken, checkRole('Administrador'), controller.update);
router.delete('/:id', verifyToken, checkRole('Administrador'), controller.remove);

module.exports = router;
