const express = require('express');
const router = express.Router();
const controller = require('../controllers/catalogoController');

router.get('/roles', controller.roles);
router.get('/preferencias', controller.preferencias);
router.get('/tipo-alojamiento', controller.tiposAlojamiento);

module.exports = router;
