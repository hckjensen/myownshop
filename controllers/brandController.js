import Brand from "../models/brand.model.js";

const brandParams = ["name", "logo_url"];

export default class BrandController {
  //GET ALL BRANDS

  getBrandList = async (req, res) => {
    try {
      const result = await Brand.findAll({
        attributes: ["id", "name"],
        order: [ "id", "ASC"]
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  //CREATE NEW BRAND

  createBrand = async (req, res) => {
    const { name, logo_url } = req.body;

    //check if conditions exist in form
    try {
      // Ensure that required properties are present
      if (name) {
        // Set optional properties to null if they are not provided
        const brandData = {
          name,
          logo_url: logo_url || null,
        };
        const result = await Brand.create(brandData);

        res.json({
          message: "Brand Added To Database",
          newBrand: result,
        });
      } else {
        res.status(400).json({
          message:
            "Invalid request. Ensure all required fields are provided: name",
        });
      }
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  };

  updateBrand = async (req, res) => {
    const { id, name, logo_url } = req.body;
    const brandObject = {};



    for (const param of brandParams) {
      // loops through each array item
      // Only updates entered values. If values are as stated, they're send to the brandObject, which is then called in the product.update in the try/catch statement
      if (req.body[param] !== undefined && req.body[param] !== "") {
        // Allows null to be entered in the form and thereby clearing the field
        if (req.body[param] === "null") {
          brandObject[param] = null;
        } // sets the param of given iteration as productObject parameter
        else {
          brandObject[param] = req.body[param];
        }
      }
    };

    // checks if any parameters are entered. return statement terminates function and thereby not updating, if no parameters are entered
    if (Object.keys(brandObject).length === 0) {
      return res.status(400).json({
        message: "No valid parameters provided for update",
      });
    }

    try {
      const result = await Brand.update(brandObject, {
        where: { id: id },
      });
      res.json({
        message: "Brand Succesfully Updated",
        updatesValues: brandObject,
      });
    } catch (error) {
      console.error("Error Updating Brand", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  //DELETE BRAND FROM DATABASE
  removeBrand = async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch the brand details before deleting
      const brandToDelete = await Brand.findOne({
        where: { id: id },
      });

      if (!brandToDelete) {
        return res.status(404).send({
          message: "Brand not found",
        });
      }

      await Brand.destroy({
        where: { id: id },
      });
      res.status(200).send({
        message: "Brand Removed From Database",
        deletedBrand: brandToDelete,
      });
    } catch (error) {
      res.send(error);
    }
  };
}
