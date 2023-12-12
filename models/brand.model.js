import sequelize from "../config/db.sequelize.js";
import { DataTypes, Model } from "sequelize";

class Brand extends Model {}

Brand.init({
    

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
    },
    logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    sequelize,
    tableName: 'brands',
    underscored: true,
    timestamps: false,
});

export default Brand