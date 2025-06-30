const usuarioService = require('../services/usuariosService');

const getAll = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await usuarioService.update(id, req.body);
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar usuario' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await usuarioService.remove(id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar usuario' });
  }
};

module.exports = { getAll, update, remove };