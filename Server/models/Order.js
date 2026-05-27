const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

   userName: {
    type: String,
  },

  items: [
    {
      itemName: String,

      quantity: Number,

      price: Number,

      image: String,
    }
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  tokenNo: {
    type: Number,
  },

  status: {
    type: String,

    enum: [
      "Pending",
      "Cooking",
      "Ready",
      "Delivered",
    ],

    default: "Pending",
  },

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);