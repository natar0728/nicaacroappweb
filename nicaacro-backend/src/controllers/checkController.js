const checkService = require('../services/checkService');

const registrarCheckIn = async (req, res) => {
  try {
    const { participante_id, staff_id, fecha_hora } = req.body;

    const result = await checkService.registrarCheckIn({ participante_id, staff_id, fecha_hora });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar check-in', error: error.message });
  }
};

const registrarCheckOut = async (req, res) => {
  try {
    const { participante_id, staff_id, fecha_hora } = req.body;

    const result = await checkService.registrarCheckOut({ participante_id, staff_id, fecha_hora });
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar check-out', error: error.message });
  }
};

module.exports = {
  registrarCheckIn,
  registrarCheckOut
};
