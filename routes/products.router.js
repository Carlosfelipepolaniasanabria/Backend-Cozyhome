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

router.post(
  "/",
  isAdmin,
  upload.single("imagen"),
  createProduct
);

router.put(
  "/:id",
  upload.single("imagen"),
  updateProduct
);

router.get("/", getProducts);

router.get("/logs", getProductLogs);

router.delete("/:id", deleteProduct);

router.get("/image/:id", getProductImageById);

export default router;