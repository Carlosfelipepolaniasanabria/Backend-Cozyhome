import express from "express";
import http from "http";
import cors from "cors";

import { configDb, sequelize } from "./config/db.js";

import "./entity/clients.entity.js";
import "./entity/products.entity.js";
import "./entity/sale.entity.js";
import "./entity/saleDetail.entity.js";

import CreateClients from "./routes/clients.router.js";
import productsRoutes from "./routes/products.router.js";
import salesRoutes from "./routes/sale.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use("/api/clients", CreateClients);
app.use("/api/products", productsRoutes);
app.use("/api", salesRoutes);

const startServer = async () => {
  try {
    await configDb();

    // 🔥 Sync global una sola vez
    await sequelize.sync();

    server.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
