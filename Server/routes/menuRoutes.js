const express = require("express");

const router = express.Router();

const Menu = require("../models/Menu");


// GET ALL MENU
router.get("/", async (req, res) => {

  try {

    const menu = await Menu.find();

    res.json(menu);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});


// UPDATE MENU
router.put("/:id", async (req, res) => {

  try {

    const updatedMenu =
      await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedMenu);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});


// DELETE MENU
router.delete("/:id", async (req, res) => {

  try {

    await Menu.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Item Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});

// ADD MENU ITEM
router.post("/", async (req, res) => {

  try {

    const menuItem =
      await Menu.create(req.body);

    res.status(201).json(menuItem);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;