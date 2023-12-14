import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export default class CategoryController {
  // Get all categories for NAV
  nav = async (req, res) => {
    try {
      const result = await Category.findAll({
        order: [
          ['id', 'ASC']
      ],
      });
      res.json(result);
    } catch (error) {
      console.error("Error loading categories");
      res.send(error);
    }
  }; //nav end

  createCategory = async (req, res) => {
    const { name } = req.body;

    if (name) {
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
    }
  };

  updateCategory = async (req, res) => {
    
    const { id, name } = req.body;
    const object = await Category.findOne({
      where: { id: id}
    })
    
    if (id && name) {
      try {
        const result = await Category.update(req.body, {
          where: { id: id },
        });
        res.json({
          message: "Category Succesfully Updated",
          updatesValues: `${object.name} changed to ${name} on id:${id}`
        });
      } catch (error) {
        console.error("Error Updating Category", error);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  };
} //Controller end
