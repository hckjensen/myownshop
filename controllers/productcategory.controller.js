import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import ProductCategory from "../models/ProductCategory.js";



export default class ProductCategoryController{



    getList = async (req, res) => {
        try {
            const result = await ProductCategory.findAll({
                order: [
                    ['category_id', 'ASC']
                ],
            })
            res.json(result)
        } catch(error) {
            console.log(error)
            res.send(error)
        };
    }


    //Add Product to Category
    addToCategory = async (req, res) => {
        const { ProductId, CategoryId } = req.body;
    
        try {
            if (ProductId && CategoryId) {
                // Find product and category by their IDs
                const product = await Product.findOne({
                    where: { id: ProductId }
                });
                
                const category = await Category.findOne({
                    where: { id: CategoryId }
                });
    
                if (!product || !category) {
                    return res.status(404).json({ message: "Product or category not found" });
                }
                
                // Create relationship in the ProductCategory table
                const relationData = {
                    ProductId,
                    CategoryId,
                    product_name: product.name,
                    category_name: category.name
                };
    
                const result = await ProductCategory.create(relationData);
    
                res.json({
                    message: `${product.name} added to ${category.name}`,
                    new_id: result.id,
                    
                });
            } else {
                res.status(400).json({ message: "ProductId and CategoryId are required" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message || "Internal Server Error");
        }
    };

    // Remove Product from Category
    removeFromCategory = async (req, res) => {
        const { id } = req.params;
        try {
            // Fetch the product details before deleting
            const relationToDelete = await ProductCategory.findOne({
              where: { id: id },
            });
      
            if (!relationToDelete) {
              return res.status(404).send({
                message: "Product not found",
              });
            };
      
            await Product.destroy({
              where: { id: id },
            });
            res.status(200).send({
              message: "Product Removed From Category",
              deletedConnection: relationToDelete,
            });
          } catch (error) {
            res.send(error);
          };

    };

        
    
    


    

};