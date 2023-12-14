import express from "express"
import ReviewController from "../controllers/reviewController.js"

const router = express.Router();
const controller = new ReviewController()



router.post('/review', (req, res) => {
    controller.createReview(req, res);
});

router.get('/product/:identifier/reviews', (req, res) => {
    controller.productReviews(req, res);
});


export { router as ReviewRouter}