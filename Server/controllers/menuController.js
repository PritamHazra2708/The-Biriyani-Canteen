const Menu = require("../models/Menu");


// ADD MENU ITEM
const addMenuItem = async (req, res) => {

  try {

    const { itemName, price, image, available } = req.body;

    const menuItem = await Menu.create({
      itemName,
      price,
      image,
      available,
    });

    res.status(201).json({
      message: "Menu item added",
      menuItem,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};



// GET ALL MENU ITEMS
const getMenu = async (req, res) => {

  try {

    const menu = await Menu.find();

    res.status(200).json(menu);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


module.exports = {
  addMenuItem,
  getMenu,
};

