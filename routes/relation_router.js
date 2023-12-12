import express  from "express";
import ProductCategoryController from "../controllers/productcategory.controller.js";

const router = express.Router();
const controller = new ProductCategoryController;


//Get full list
router.get('/relationships', (req, res) => {
    controller.getList(req, res);
})


//CREATE PRODUCT & CATEGORY RELATIONS
router.post('/relate', (req, res) => {
    controller.addToCategory(req, res);
});

//REMOVE PRODUCT FROM CATEGORY
router.delete('/relationships/:id([0-9]*)', (req, res) => {
    controller.removeFromCategory(req, res);
})

export { router as ProductCategoryRouter }