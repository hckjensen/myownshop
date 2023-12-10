import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();
const controller = new CategoryController;




//list of categories(or navigation)
router.get('/categories', (req, res) => {
    controller.nav(req, res)
});

//LIST OF ALL ITEMS WITHIN CATEGORY
router.get('/:name', (req, res) => {
    controller.getProductByCategory(req, res)
});


//Create category
router.post('/category', (req, res) => {
    controller.createCategory(req, res);
});

export { router as CategoryRouter }