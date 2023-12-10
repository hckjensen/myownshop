import express from "express"
import ProductController from "../controllers/product.controller.js";

const router = express.Router();
const controller = new ProductController()

router.post('/product', (req, res) => {
    controller.createProduct(req, res);
});

router.put('/product', (req, res) => {
    controller.updateProduct(req, res);
});

export { router as ProductRouter }