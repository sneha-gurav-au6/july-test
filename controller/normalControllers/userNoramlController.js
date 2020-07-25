const User = require("../../models/user");
const Property = require("../../models/image");

module.exports = {
  userMyFavs: async (req, res) => {
    const user = req.user;
    const arr = [];
    try {
      const data = await User.findByPk(user.id);
      const favList = data.favourite;
      const fav1 = favList.split(",");

      for (i = 0; i <= fav1.length; i++) {
        const fav2 = fav1[i] + " ";
        if (fav1[i] !== "null") {
          const user = await Property.findByPk(fav1[i]);
          arr.push(user);
        }
      }
      console.log(arr);
      res.json(arr);
    } catch (err) {
      console.log(err.massage);

      res.json({
        message: "You dont have any Images added to your favourite list",
        status: 200,
      });
    }
  },
};
