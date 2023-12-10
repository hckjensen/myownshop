import sequelize from "../config/db.sequelize.js";
import { DataTypes, Model } from "sequelize";

class Category extends Model {}

Category.init({
    

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
    sequelize,
    tableName: 'categories',
    underscored: true
});

export default Category