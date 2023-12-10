import sequelize from "../config/db.sequelize.js"
import { DataTypes, Model } from "sequelize";
import Image from "./image.model.js";
import Brand from "./brand.model.js";
import Category from "./category.model.js"

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        
        
    },
    {
        sequelize,
        tableName: 'products',
        underscored: true, // Brug underscores istedet for standarden CamelCase
    });

    //Define Relationships
    Product.hasMany(Image, { as: 'images', foreignKey: 'product_id' });
    Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
    Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

    export default Product