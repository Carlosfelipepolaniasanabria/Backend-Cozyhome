import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",

    // 🔥 IMPORTANTE PARA CLEVER CLOUD
    pool: {
      max: 2,       // no más de 2 conexiones activas
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    logging: false
  }
);

export const configDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

