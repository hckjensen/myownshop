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


  //Edit review
  editReview = async (req, res) => {
    const { id, comment, num_stars } = req.body;
  
    try {
      // Find the review by ID
      let review = await Review.findByPk(id);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      // Construct the update object based on the provided parameters
      const updateObject = {};
      if (comment !== undefined && comment !== "") {
         // Allows null to be entered in the form and thereby clearing the field
         if (comment === "null") {
            comment = null;
          } else {
            updateObject.comment = comment;
          }
        
      }
      if (num_stars !== undefined && num_stars !== "") {
        // Allows null to be entered in the form and thereby clearing the field
        if (num_stars === "null") {
           num_stars = null;
         } else {
           updateObject.num_stars = num_stars;
         }
       
     }
  
      // Update the review with the constructed object
      const result = Review.update(updateObject, {
        where: {id: id}
      });
  
      
  
      res.json({
        ReviewToUpdate: review,
        UpdatedReview: updateObject
      });
    } catch (error) {
      console.error(error);
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



  //DELETE REVIEW FROM DATABASE
  deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch the product details before deleting
      const reviewToDelete = await Review.findOne({
        where: { id: id },
      });

      if (!reviewToDelete) {
        return res.status(404).send({
          message: "Review not found",
        });
      };

      await Review.destroy({
        where: { id: id },
      });
      res.status(200).send({
        message: "Review Deleted",
        deletedProduct: reviewToDelete,
      });
    } catch (error) {
      res.send(error);
    };
  };




  };






