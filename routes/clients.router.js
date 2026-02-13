import { Router } from "express";
import { Users } from "../entity/clients.entity.js";
import { login } from "../controllers/auth.controller.login.js";
import { body } from "express-validator";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();
router.post(
  "/Register",
  [
    body("identificacion").isNumeric().withMessage("Identificación inválida"),
    body("primer_Nombre").isString().exists(),
    body("segundo_Nombre").optional().isString(),
    body("primer_Apellido").isString().exists(),
    body("segundo_Apellido").isString().exists(),
    body("correo").isEmail().withMessage("Correo inválido"),
    body("contrasena").isString().exists(),
    body("rol").optional().isIn(["admin", "usuario"]),
  ],
  async (req, res) => {
    try {
      const userCreate = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userCreate.contrasena, salt);
      userCreate.contrasena = hashedPassword;
      const count = await Users.count();
      const roleToAssign =
        count === 0 ? "admin" : userCreate.rol || "usuario";
      const createdUser = await Users.create({
        ...userCreate,
        rol: roleToAssign,
      });
      return res.json({
        message: "Usuario registrado correctamente",
        data: {
          correo: createdUser.correo,
          rol: createdUser.rol,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "No se pudo registrar el usuario",
      });
    }
  }
);
router.post("/Login", login);
router.get("/perfil", verifyToken, (req, res) => {
  res.json({
    message: "Acceso permitido",
    usuario: req.user
  });
});
export default router;

