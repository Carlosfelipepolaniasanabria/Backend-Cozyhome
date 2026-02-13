export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "No autenticado",
      });
    }

    if (req.user.rol !== "admin") {
      return res.status(403).json({
        message: "Acceso denegado: solo administradores",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error verificando rol",
      error: error.message,
    });
  }
};
