import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImageById,
  getProductLogs
} from "../controllers/products.controller.js";

import { isAdmin } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getProducts);

router.get("/logs", isAdmin, getProductLogs);

router.delete("/:id", isAdmin, deleteProduct);

router.get("/image/:id", getProductImageById);

export default router;