import { Sequelize } from "sequelize";
import db from "../database.js";
import Negara from "./Negara.js";

const { DataTypes } = Sequelize;

const Artis = db.define("Artis", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  namaArtis: DataTypes.STRING,
  tahunLahir: DataTypes.INTEGER,
  kewarganegaraan: DataTypes.INTEGER,
});

Artis.belongsTo(Negara, {
  foreignKey: "kewarganegaraan",
})

export default Artis;
