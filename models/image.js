const db = require("../db");
const { Sequelize, DataTypes } = require("sequelize");

const Property = db.define("Property", {
  image_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // property_rent: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  // },
  // proprty_deposit: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // property_type: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // property_type_gender: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // property_amenities: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // property_location: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // propert_possesion: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // property_address: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // property_area: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  // property_furnish: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  // },
  description: {
    type: DataTypes.STRING,
  },
  privacy_status: {
    type: DataTypes.BOOLEAN,
  },
  user: {
    type: DataTypes.STRING,
  },
});

module.exports = Property;
