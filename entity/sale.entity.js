import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Sale = sequelize.define("Sale", {
  id_sale: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  identificacion_usuario: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },

  estado: {
    type: DataTypes.ENUM("pendiente", "completada"),
    defaultValue: "pendiente",
  },
});

