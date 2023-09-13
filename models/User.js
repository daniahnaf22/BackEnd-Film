import { Sequelize } from "sequelize";
import db from "../database.js";

const { DataTypes } = Sequelize;

const User = db.define("User", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  refresh_token: DataTypes.TEXT,
});

export default User;
