const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Menu = require("./models/Menu");
const menuItems = require("./menuData");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  console.log("MongoDB Connected");

  await Menu.deleteMany();

  await Menu.insertMany(menuItems);

  console.log("Menu Added Successfully");

  process.exit();

})
.catch((err) => console.log(err));