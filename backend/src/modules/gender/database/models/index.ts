import { DataTypes } from "sequelize";
import { DB } from "..";

const Gender = DB.instance.sequelize.define("Gender", {
  genderId: {
    type: DataTypes.INTEGER,
    field: "gender_id",
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(10),
    allowNull: false,
    field: "name",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: "is_active",
  },
});

export { Gender };
