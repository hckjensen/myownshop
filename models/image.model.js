import sequelize from "../config/db.sequelize.js";
import { DataTypes, Model } from "sequelize";

class Image extends Model {}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          imageName: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
          },  
    },
    {
        sequelize,
        tableName: 'images',
        underscored: true,
    }
);

export default Image