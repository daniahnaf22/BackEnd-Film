import { Sequelize } from "sequelize";
import db from "../database.js";

const { DataTypes } = Sequelize;

const Negara = db.define("Negara", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  namaNegara: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Negara;
