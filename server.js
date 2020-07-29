let express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./Routes/userRoutes");
const propertyRoutes = require("./Routes/imageRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("./db");
require("./utils/cloudinary");
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(userRoutes);
app.use(propertyRoutes);

app.listen(PORT, () => {
  console.log("server started");
});
