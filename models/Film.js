import { Sequelize } from "sequelize";
import db from "../database.js";

import Artis from "./Artis.js";
import RumahProduksi from "./RumahProduksi.js";
import Negara from "./Negara.js";

const { DataTypes } = Sequelize;

const Film = db.define("Film", {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  judulFilm: DataTypes.STRING,
  deskFilm: DataTypes.TEXT,
  artisId: DataTypes.INTEGER,
  rumahProduksiId: DataTypes.INTEGER,
  tahun: DataTypes.INTEGER,
  negaraId: DataTypes.INTEGER,
});

// Negara.hasMany(Film);

Film.belongsTo(RumahProduksi, {
  foreignKey: "rumahProduksiId",
});

Film.belongsTo(Artis, {
  foreignKey: "artisId",
});

Film.belongsTo(Negara, {
  foreignKey: "negaraId",
});

export default Film;
