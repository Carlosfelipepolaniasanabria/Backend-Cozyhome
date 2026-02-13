import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 


console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const configDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Db connected ");
  } catch (error) {
    console.error("Unable to connect to the database ", error);
  }
};

