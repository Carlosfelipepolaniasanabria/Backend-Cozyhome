import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Products = sequelize.define("Products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    defaultValue: true,
  }
},
{
  tableName: "productos",
  timestamps: true,
});

Products.sync();
