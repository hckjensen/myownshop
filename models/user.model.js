import sequelize from "../config/db.sequelize.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {}

User.init(
  {
    // Objekt med felter
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword)
        }
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'users',
    underscored: true, // Brug underscores istedet for standarden CamelCase
  }
);

export default User;
