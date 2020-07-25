const { Router } = require("express");
const router = Router();
const Property = require("../models/image");
const User = require("../models/user");
const auth = require("../middleware/auth");

const {
    register,
    login,
    logout,
    addImage,
    userMyFav,
} = require("../controller/apiControllers/userApiController");

const {
    userMyFavs,
} = require("../controller/normalControllers/userNoramlController");

router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/addproperty", auth, addImage);
router.post("/user/logout", auth, logout);
router.post("/user/profile/addmyfav/:property_id", auth, userMyFav);

router.get("/myfav", auth, userMyFavs);

module.exports = router;
