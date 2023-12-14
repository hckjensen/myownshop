import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import ProductCategory from "../models/ProductCategory.js";
import Review from "../models/reviews.model.js";
import User from "../models/user.model.js";

const productParams = [
  "name",
  "price",
  "description",
  "stock",
  "brand_id",
  "image_url",
];

const getProductByAttribute = async (
  req,
  res,
  model,
  attributeName,
  errorMessage
) => {
  try {
    let products;
    // Get attribute value from URL
    const paramValue = req.params.name;

    // Find the attribute in the specified model
    const attribute = await model.findOne({ where: { name: paramValue } });

    if (!attribute) {
      // If the provided value doesn't exist in the database, return an error and terminate the function
      return res.status(404).json({ error: errorMessage });
    }

    // Find all products where the attribute_id in the product table corresponds with the id in the attribute table
    if (attributeName == "brand") {
      products = await Product.findAll({
        where: { [`${attributeName}_id`]: attribute.id },
      });
    } else if (attributeName == "category") {
      products = await ProductCategory.findAll({
        where: { [`${attributeName}_id`]: attribute.id },
      });
    } else {
      return res.status(400).json({
        message: "Invalid attributeName",
      });
    }

    const productsArray = products.map((product) => product.toJSON());

    if (productsArray.length === 0) {
      return res.status(400).json({
        message: `No Products in this ${attributeName}`,
      });
    }

    res.json(productsArray);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export default class ProductController {
  //GET ALL PRODUCTS

  getProductList = async (req, res) => {
    try {
      const result = await Product.findAll({
        attributes: ["id", "name", "price",],
        include: {
          model: Brand,
          attributes: ["name"],
          as: "brand",
        },
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  // GET all products in category

  getProductByCategory = async (req, res) => {
    await getProductByAttribute(
      req,
      res,
      Category,
      "category",
      "Category doesn't exist"
    );
  };

  // GET all products by brand

  getProductByBrand = async (req, res) => {
    await getProductByAttribute(
      req,
      res,
      Brand,
      "brand",
      "Brand doesn't exist"
    );
  };



  // GET PRODUCT DETAILS
productDetails = async (req, res) => {
  const { identifier } = req.params;
  

  try {
    const result = isNaN(identifier)
      ? await Product.findOne({ where: { name: identifier }, 
        include: {
        model: Brand,
        attributes: ["name"],
        as: "brand",
      },
      include: {
        model: Review,
        attributes: ["user_Id", "num_stars", "comment"],
        as: "reviews",
        
      }

     })
      : await Product.findByPk(identifier, {
        include: {
          model: Brand,
          attributes: ["name"],
          as: "brand",
        },
        include: {
          model: Review,
          attributes: ["user_Id", "num_stars", "comment"],
          as: "reviews",
          
        }
      });
      

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





  //CREATE PRODUCT
  createProduct = async (req, res) => {
    const { name, price, description, stock, brand_id, image_url } = req.body;

    //check if conditions exist in form
    try {
      // Ensure that required properties are present
      if (name && price && brand_id) {
        // Set optional properties to null if they are not provided
        const productData = {
          name,
          price,
          description: description || null,
          stock: stock || null,
          brand_id,
          image_url: image_url || null,
        };
        const result = await Product.create(productData);

        res.json({
          message: "Product Added To Database",
          result
        });
      } else {
        res.status(400).json({
          message:
            "Invalid request. Ensure all required fields are provided: name, price, brand_id",
        });
      }
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  };
  //CREATE PRODUCT END

  //UPDATE PRODUCT
  updateProduct = async (req, res) => {
    const { id, name, price, description, stuck, brand_id, image_url } =
      req.body;

    const productObject = {};
    for (const param of productParams) {
      // loops through each array item
      // Only updates entered values. If values are as stated, they're send to the productObject, which is then called in the product.update in the try/catch statement
      if (req.body[param] !== undefined && req.body[param] !== "") {
        // Allows null to be entered in the form and thereby clearing the field
        if (req.body[param] === "null") {
          productObject[param] = null;
        } // sets the param of given iteration as productObject parameter
        else {
          productObject[param] = req.body[param];
        }
      }
    }

    // checks if any parameters are entered. return statement terminates function and thereby not updating, if no parameters are entered
    if (Object.keys(productObject).length === 0) {
      return res.status(400).json({
        message: "No valid parameters provided for update",
      });
    }

    try {
      const result = await Product.update(productObject, {
        where: { id: id },
      });
      res.json({
        message: "Product Updated",
        updatedValues: productObject,
      });
    } catch (error) {
      //runs if wrong DATATYPE is entered in the form body
      console.error("Error Updating Product", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }; //Update function end

  //DELETE PRODUCT FROM DATABASE
  removeProduct = async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch the product details before deleting
      const productToDelete = await Product.findOne({
        where: { id: id },
      });

      if (!productToDelete) {
        return res.status(404).send({
          message: "Product not found",
        });
      };

      await Product.destroy({
        where: { id: id },
      });
      res.status(200).send({
        message: "Product Removed From Database",
        deletedProduct: productToDelete,
      });
    } catch (error) {
      res.send(error);
    };
  };
} // CONTROLLER END
