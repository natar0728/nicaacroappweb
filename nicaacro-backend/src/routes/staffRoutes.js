const express = require('express');
const router = express.Router();
const controller = require('../controllers/staffController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

// Ruta base: /api/staff
router.get('/', verifyToken, checkRole('Administrador', 'Organizador'), controller.getAll);
router.get('/:id', verifyToken, checkRole('Administrador', 'Organizador'), controller.getById);
router.post('/crear', verifyToken, checkRole('Administrador', 'Organizador'), controller.create);
router.put('/:id',verifyToken, checkRole('Administrador', 'Organizador'),  controller.update);
router.delete('/:id', verifyToken, checkRole('Administrador', 'Organizador'), controller.remove);

module.exports = router;
