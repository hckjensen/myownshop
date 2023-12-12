import sequelize from "../config/db.sequelize.js"
import { DataTypes, Model } from "sequelize";
import Product from "./product.model.js";
import Category from "./category.model.js";



class ProductCategory extends Model {}

ProductCategory.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
    
},
{
    sequelize,
    tableName: 'productcategory',
    underscored: true, // Brug underscores istedet for standarden CamelCase
    timestamps: false,
});



export default ProductCategory;