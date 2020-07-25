const Property = require("../models/image");
const auth = require("../middleware/auth");
const { Router } = require("express");
const {
    getImages,
    getImageDetailsById,
} = require("../controller/normalControllers/propertyNormalController");

const router = Router();

router.get("/property", getImages);
router.get("/property/detail/:property_id", getImageDetailsById);

module.exports = router;
