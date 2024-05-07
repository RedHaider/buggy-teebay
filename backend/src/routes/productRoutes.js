import Router from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getMyProducts,
  buyProduct,
  rentProduct,
  getBoughtProducts,
  getSoldProducts,
  getRentedProducts,
  getLentProducts,
} from "../controller/productsController.js";

const router = Router();

// Get all products
router.get("/products", getAllProducts);

// Get current user products
router.get("/:userId/products", getMyProducts);

// Get current user bought products
router.get("/:userId/bought", getBoughtProducts);

// Get current user sold products
router.get("/:userId/sold", getSoldProducts);

// Get current user rented products
router.get("/:userId/rented", getRentedProducts);

// Get current user lent produrend
router.get("/:userId/lent", getLentProducts);

// Add Product
router.post("/:userId/product", addProduct);

// Delete Product
router.delete("/:userId/:productId/2", deleteProduct);

// Edit Product
router.patch("/:userId/:productId/1", editProduct);

// Buy Product
router.post("/buy/:userId/:productId", buyProduct);

// Rent Product
router.post("/rent/:userId/:productId", rentProduct);

export default router;
