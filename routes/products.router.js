import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImageById,
  getProductLogs
} from "../controllers/products.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("imagen"),
  createProduct
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("imagen"),
  updateProduct
);

router.get("/", getProducts);

router.get("/logs", verifyToken, isAdmin, getProductLogs);

router.delete("/:id", verifyToken, isAdmin, deleteProduct);

router.get("/image/:id", getProductImageById);

export default router;