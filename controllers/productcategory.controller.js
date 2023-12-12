import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import ProductCategory from "../models/ProductCategory.js";

export default class ProductCategoryController{



    getList = async (req, res) => {
        try {
            const result = await ProductCategory.findAll()
            res.json(result)
        } catch(error) {
            console.log(error)
            res.send(error)
        };
    }

    createRelationship = async (req, res) => {
        //HAS TO BE PASCALCASE FOR SOME FUCKING REASON??????
        const { ProductId, CategoryId } = req.body;
        
       
        try {
                if (ProductId && CategoryId) {
                    const relationData = {
                        ProductId,
                        CategoryId,                    
                    };
                    const result = await ProductCategory.create(relationData)
                res.json({
                    message: "Relation Created",
                    new_id: result.id
                })
                }
                
            
        } catch(error) {
            res.send(error);
            console.log(error);
        };
    };


    
};