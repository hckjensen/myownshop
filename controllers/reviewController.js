import Review from "../models/reviews.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";

export default class ReviewController {
  // Create review for product
  createReview = async (req, res) => {
    try {
      const { user_Id, product_id, num_stars, comment } = req.body;

      // Check if the user and product exist
      const user = await User.findOne({
        where: { id: user_Id}
      });
      const product = await Product.findOne({
        where: {id: product_id},
        
      });

      if (!user || !product) {
        return res.status(404).json({ message: "User or product not found" });
      }

      const review = await Review.create(req.body);

      res.json({
        message: "Review posted",
        review
      })

    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  };

  //Product Reviews
  productReviews = async (req, res) => {
    const { identifier } = req.params;
  
    try {
      const product = isNaN(identifier)
        ? await Product.findOne({ where: { name: identifier } })
        : await Product.findByPk(identifier);
  
      if (!product) {
        // If the provided value doesn't exist in the database, return an error and terminate the function
        return res.status(404).json({ error: 'Product Not Found' });
      }
  
      // Use the association to get all reviews for the product
      const reviews = await product.getReviews();
  
      res.json({
        Product: product.name,
        reviews
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  };





;
