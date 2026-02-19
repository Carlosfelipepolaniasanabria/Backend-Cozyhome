import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProductImageById
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

router.get("/", getProducts);

router.delete("/:id", verifyToken, isAdmin, deleteProduct);

router.get("/image/:id", getProductImageById);

export default router;

