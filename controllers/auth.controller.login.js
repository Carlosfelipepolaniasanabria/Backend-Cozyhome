import { Users } from "../entity/clients.entity.js";
import jwt from "jsonwebtoken";
 import bcrypt from "bcryptjs"; // asegúrate de tenerlo arriba

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
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const {
      contrasena: _,
      ...userSinPassword
    } = user.dataValues;

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

