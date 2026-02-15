import express from "express";
import http from "http";
import cors from "cors";

import { configDb } from "./config/db.js";
import { Users } from "./entity/clients.entity.js";
import { Products } from "./entity/products.entity.js";
import { Sale } from "./entity/sale.entity.js";
import {SaleDetail} from "./entity/saleDetail.entity.js";


import CreateClients from "./routes/clients.router.js";
import productsRoutes from "./routes/products.router.js";
import salesRoutes from "./routes/sale.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

configDb();

Users.sync();
Products.sync();
Sale.sync();
SaleDetail.sync();

app.use("/uploads", express.static("uploads"));
app.use("/api/clients", CreateClients);
app.use("/api/products", productsRoutes);
app.use("/api", salesRoutes);

server.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
