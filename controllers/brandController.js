import Brand from "../models/brand.model.js";

export default class BrandController {
  //GET ALL BRANDS

  getBrandList = async (req, res) => {
    try {
      const result = await Brand.findAll({
        attributes: ['name']
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
          newBrand: result
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
