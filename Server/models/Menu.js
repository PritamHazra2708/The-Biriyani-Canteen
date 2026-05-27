const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({

  itemName: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
  },

  available: {
    type: Boolean,
    default: true,
  },

});

module.exports = mongoose.model("Menu", menuSchema);