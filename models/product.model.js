import sequelize from "../config/db.sequelize.js"
import { DataTypes, Model } from "sequelize";
import Image from "./image.model.js";
import Brand from "./brand.model.js";
import Category from "./category.model.js"
import ProductCategory from "./ProductCategory.js";

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
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
        
        
    },
    {
        sequelize,
        tableName: 'products',
        underscored: true, // Brug underscores istedet for standarden CamelCase
        timestamps: false,
    });

    //Define Relationships
    Product.hasMany(Image, { as: 'images', foreignKey: 'product_id' });
    Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
    Product.belongsToMany(Category, {
         through: { 
            model: 'ProductCategory',
            foreignKey: {
                field: 'product_id',
                name: 'product_id'
            },
            type: DataTypes.INTEGER,
            allowNull: false, 
            underscored: true}});

    Category.belongsToMany(Product, { 
        through: { 
            model: 'ProductCategory',
            foreignKey: {
                field: 'category_id',
                name: 'category_id'
            },
             
            type: DataTypes.INTEGER,
            allowNull: false, 
            underscored: true}});

    export default Product