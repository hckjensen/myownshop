import express from "express"
import BrandController from "../controllers/brandController.js";

const router = express.Router();
const controller = new BrandController()



//GET LIST OF ALL BRANDS
router.get('/brands', (req, res) => {
    controller.getBrandList(req, res)
})

//CREATE BRAND
router.post('/brand', (req, res) => {
    controller.createBrand(req, res);
});


//UPDATE BRAND
router.put('/brand', (req, res) => {
    controller.updateBrand(req, res);
});

//delete brand
router.delete('/brand/:id([0-9]*)', (req, res) => {
    controller.removeBrand(req, res);
});





export { router as BrandRouter }