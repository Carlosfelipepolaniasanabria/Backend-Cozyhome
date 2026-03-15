import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ProductLog = sequelize.define(
  "ProductLog",
  {
    id_log: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    accion: {
      type: DataTypes.ENUM("actualizacion"),
      allowNull: false,
      defaultValue: "actualizacion",
    },
  },
  {
    tableName: "product_log",
    timestamps: true,
  }
);

ProductLog.sync();