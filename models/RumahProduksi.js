import { Sequelize } from "sequelize";
import db from "../database.js";
const { DataTypes } = Sequelize;

const RumahProduksi = db.define("RumahProduksi", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  namaRumahProduksi: DataTypes.STRING,
  tahunBerdiri: DataTypes.INTEGER,
});

export default RumahProduksi;
