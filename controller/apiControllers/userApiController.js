const User = require("../../models/user.js");
const Property = require("../../models/image");
const multiparty = require("multiparty");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
module.exports = {
  register: async (req, res) => {
    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (email) return res.send("Email is already existed");
    const user = req.body;
    jwt.sign(
      {
        user: user,
      },
      "secret key",
      async (err, token) => {
        try {
          const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            token: token,
          });
          res.status(201).json({
            message:
              "You have registered succefully.Your details are as follows",
            status: 201,
            user: data,
          });
        } catch (err) {
          res.status(500).send(`Validation Error: ${err.message}`);
        }
      }
    );
  },

  login: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Incorrect credentials");
    try {
      const data = await User.findByEmailAndPassword(email, password);
      var user1 = User.findByPk(data.id, {
        raw: true,
      }).then(function (users) {
        jwt.sign(
          {
            id: data.id,
          },
          "secret key",
          {
            expiresIn: 60 * 60 * 1,
          },
          (err, token) => {
            User.update(
              {
                token: token,
              },
              {
                returning: true,
                where: {
                  id: data.id,
                },
              }
            )
              .then(function (now) {
                res.status(200).json({
                  message: "Logged in successfully",
                  token: token,
                });
              })
              .catch(function (err) {
                console.log(err.message);
              });
          }
        );
      });
    } catch (err) {
      console.log(err);
      res.status(401).send("Invalid Credintials");
    }
  },

  logout: async (req, res) => {
    const user = req.user;
    try {
      User.update(
        {
          token: null,
        },
        {
          returning: true,
          where: {
            id: user.id,
          },
        }
      );
      res.json({
        status: 200,
        message: "logged Out Successfully!! See you Again",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(`Validation Error: ${err.message}`);
    }
  },
  addImage: (req, res) => {
    const form = new multiparty.Form({
      uploadDir: "uploads",
    });
    form.parse(req, function (err, fields, files) {
      const image_title = fields.image_title[0];

      const image_description = fields.description[0];
      const privacyStatus = fields.privacy_status[0];
      const img = files.image[0].path;
      cloudinary.uploader
        .upload(img, function (result, error) {
          if (error) {
            console.log(error);
          }
          const user = req.user;
          // console.log(user)
          User.findByPk(user.id)
            .then(function (user) {
              console.log(user);
              const property = Property.create({
                image_title: image_title,
                description: image_description,
                privacy_status: privacyStatus,
                image: result.secure_url,
                user: user.id,
              })
                .then(function (data) {
                  res.json(data);
                })
                .catch(function (err) {
                  res.status(401).send("Invalid token");
                  console.log(err.message);
                });
              // console.log(user.id);
            })
            .catch(function (err) {
              res.status(401).send("Invalid token");
              console.log(err.message);
            });
        })
        .catch(function (err) {
          res.status(401).send("Invalid token");
          console.log(err.message);
        });
    });
  },

  userMyFav: async (req, res) => {
    const user = req.user;
    const property = req.params.property_id;
    console.log(property);
    try {
      const data = await User.findByPk(user.id, {
        raw: true,
      });
      const data1 = await User.update(
        {
          favourite: property + "," + data.favourite,
        },
        {
          returning: true,
          where: {
            id: user.id,
          },
        }
      );
      res.status(200).json({
        massage: "Image added to your favourite list",
      });
    } catch (err) {
      console.log(err.massage);
      res.status(500).send("server error");
    }
  },
};
