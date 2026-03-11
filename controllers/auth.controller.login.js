import { Users } from "../entity/clients.entity.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({
        message: "Correo y contraseña son obligatorios",
      });
    }

    const user = await Users.findOne({ where: { correo } });

    if (!user) {
      return res.status(404).json({
        message: "Correo incorrecto",
      });
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      { id: user.identificacion, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { contrasena: _, ...userSinPassword } = user.dataValues;

    return res.json({
      message: "Login exitoso",
      user: userSinPassword,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el login",
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { correo, currentPassword, newPassword, confirmPassword } = req.body;

    if (!correo || !currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Debes completar todos los campos",
      });
    }

    const user = await Users.findOne({ where: { correo } });

    if (!user) {
      return res.status(404).json({
        message: "El correo no está registrado",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.contrasena);

    if (!isMatch) {
      return res.status(401).json({
        message: "La contraseña actual es incorrecta",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "La nueva contraseña debe tener mínimo 8 caracteres",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "La confirmación de la nueva contraseña no coincide",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.contrasena);

    if (isSamePassword) {
      return res.status(400).json({
        message: "La nueva contraseña no puede ser igual a la actual",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.contrasena = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al cambiar la contraseña",
      error: error.message,
    });
  }
};