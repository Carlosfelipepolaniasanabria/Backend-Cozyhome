import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Sale } from "./sale.entity.js";

export const SaleDetail = sequelize.define("SaleDetail", {
  id_detail: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  id_sale: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  nombre_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Sale.hasMany(SaleDetail, {
  foreignKey: "id_sale",
  as: "detalles",
});

SaleDetail.belongsTo(Sale, {
  foreignKey: "id_sale",
});

