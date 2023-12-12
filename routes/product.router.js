import express from "express"
import ProductController from "../controllers/product.controller.js";

const router = express.Router();
const controller = new ProductController()



// GET LIST OF ALL PRODUCTS
router.get('/products', (req, res) => {
    controller.getProductList(req, res)
})


// Get products of a given category
router.get('/category/:name', (req, res) => {
    controller.getProductByCategory(req, res);
});

// Get products of a given brand
router.get('/brand/:name', (req, res) => {
    controller.getProductByBrand(req, res);
});



//Create product
router.post('/product', (req, res) => {
    controller.createProduct(req, res);
});


//update product
router.put('/product', (req, res) => {
    controller.updateProduct(req, res);
});

//delete product
router.delete('/product/:id([0-9]*)', (req, res) => {
    controller.removeProduct(req, res);
});

export { router as ProductRouter }