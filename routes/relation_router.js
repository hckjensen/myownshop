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
    controller.createRelationship(req, res);
});

export { router as ProductCategoryRouter }