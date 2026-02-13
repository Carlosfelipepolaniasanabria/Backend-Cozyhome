import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Users = sequelize.define("Users", {
    identificacion:{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,     
        autoIncrement: false, 

    },
    primer_Nombre: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    segundo_Nombre: {
        type: DataTypes.STRING,
        allowNull: false, 
        defaultValue: "Usuario sin segundo nombre",
    },
    primer_Apellido: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    segundo_Apellido: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    
    correo:{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    contrasena:{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    rol: {
        type: DataTypes.ENUM("admin", "usuario"),
        allowNull: false,
        defaultValue: "usuario",
    }
}
);

Users.sync();