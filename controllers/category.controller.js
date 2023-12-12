import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export default class CategoryController {

    // Get all categories for NAV
    nav = async (req, res) => {
        try {
            const result = await Category.findAll()
            res.json(result)
        } catch(error) {
            console.error("Error loading categories");
            res.send(error)
        };
        
    }; //nav end


    createCategory = async (req, res) => {
        const { name } = req.body;
    
        if (name)
          //check if conditions exist in form
          try {
            const result = await Category.create(req.body);
            res.json({
              message: "Category created",
              new_id: result.id,
            });
          } catch (error) {
            res.send(error);
            console.log(error);
          }
      };

}; //Controller end


