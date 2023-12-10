import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";



const productParams = [
    "name",
    "price",
    "description",
    "category_id",
    "brand_id",
    "image_url"    
];


export default class ProductController {




    //CREATE PRODUCT
    createProduct = async (req, res) => {
        const { name, price, description, category_id, brand_id, image_url} = req.body;
    
          //check if conditions exist in form
          try {

             // Ensure that required properties are present
             if (name && price && category_id && brand_id) {
                // Set optional properties to null if they are not provided
                const productData = {
                    name,
                    price,
                    description: description || null,
                    category_id,
                    brand_id,
                    image_url: image_url || null,
                };
            const result = await Product.create(productData);
            
            res.json({
              message: "Product Added To Database",
              new_id: result.id,
            });
          } else {
            res.status(400).json({
                message: "Invalid request. Ensure all required fields are provided: name, price, category_id, brand_id",
                });
            }
        }
          catch (error) {
            res.send(error);
            console.log(error);
          }
      };
      //CREATE PRODUCT END

      //UPDATE PRODUCT
      updateProduct = async (req, res) => {
        const {
            id,  
            name, 
            price, 
            description, 
            category_id, 
            brand_id, 
            image_url
        } = req.body;
    
        const productObject = {};
        for (const param of productParams) { // loops through each array item
            // Only updates entered values. If values are as stated, they're send to the productObject, which is then called in the product.update in the try/catch statement
          if (  req.body[param] !== undefined && req.body[param] !== "") { 
            
            // Allows null to be entered in the form and thereby clearing the field 
            if (req.body[param] === "null") {
                productObject[param] = null;
            } // sets the param of given iteration as productObject parameter 
            else {
                productObject[param] = req.body[param];
            };
          };
        };
    
        // checks if any parameters are entered. return statement terminates function and thereby not updating, if no parameters are entered
        if (Object.keys(productObject).length === 0) {
            return res.status(400).json({
              message: 'No valid parameters provided for update',
            });
          };
          
        try { 
          const result = await Product.update(productObject, {
            where: { id: id }
          });
          res.json({
            message: "Product Updated",
            updatedValues: productObject,
          });
        } catch (error) { //runs if wrong DATATYPE is entered in the form body
          console.error("Error Updating Product", error);
          res.status(500).json({
            message: "Internal Server Error",
          });
        };
      }; //Update function end


} // CONTROLLER END



