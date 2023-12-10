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

    // GET all products in category

    getProductByCategory = async (req, res) => {

        try {
            // Get category name from URL
            const  categoryName  = req.params.name; 

            //Finds category with name corresponding to value given in URL in the Category model
            const category = await Category.findOne({ where: { name: categoryName}});
            
            if(!category){ // If provided name doesn't exist in database, return error and terminate function
                return res.status(404).json({ error: "Category doesn't exist"}) 
            }

            // Find all products where catergory_id in product table corresponds with id in category table
            const products = await Product.findAll({ where: { category_id: category.id } });
            console.log(products);
            if(products.length >= 0)
            
            res.json(products)

        } catch {}
    };


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
