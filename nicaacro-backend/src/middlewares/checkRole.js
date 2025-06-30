const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    //verificar que el user y el rol estén
    if (!user || !user.rol) {
      return res.status(403).json({ message: 'Acceso denegado: rol no definido' });
    }
    //verificar si existe el permiso
    if (!allowedRoles.includes(user.rol)) {
      return res.status(403).json({ message: 'No tienes permiso para esta acción' });
    }

    next();
  };
};

module.exports = checkRole;
