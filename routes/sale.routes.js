import { Router } from "express";
import {
  createSale,
  getSalesByUser,
  getAllSales,
  updateSaleStatus,
} from "../controllers/sales.controller.js";

const router = Router();

router.post("/sales", createSale);
router.get("/sales/user/:identificacion", getSalesByUser);

router.get("/sales", getAllSales);
router.put("/sales/:id", updateSaleStatus);

export default router;
