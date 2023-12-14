import sequelize from "../config/db.sequelize.js";
import { DataTypes, Model } from "sequelize";

import Product from "./product.model.js";
import User from "./user.model.js";

class Review extends Model {}

    Review.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            num_stars: {
                type: DataTypes.ENUM('1', '2', '3', '4', '5'),
                allowNull: false,
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: true,
            }
            
        },
        {
            sequelize,
            tableName: "reviews",
           // underscored: true,
            timestamps: true,
        }
    );


    //Associations

    
    Review.belongsTo(User, { foreignKey: "user_Id", as:  "user"});

    export default Review;

