const Property = require("../../models/image");
const { Op } = require("sequelize");

module.exports = {
  getImages: (req, res) => {
    Property.findAll({
      raw: true,
    })
      .then(function (property) {
        res.send(property);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },
  getImageDetailsById: async (req, res) => {
    const detail = req.params.property_id;
    console.log(detail);

    const property = [];

    try {
      const propertyDetails = await Property.findByPk(detail);

      const propertys = {
        property_title: propertyDetails.image_title,
        property_img: propertyDetails.image,
        property_rent: propertyDetails.description,
        property_deposit: propertyDetails.privacy_status,
        // property_loction: propertyDetails.user,
      };
      property.push(propertys);

      res.status(200).json(property);
    } catch (err) {
      res.status(500).send("server error");
      console.log(err.massage);
    }
  },
};
