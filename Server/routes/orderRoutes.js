const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");


// PLACE ORDER
router.post("/", placeOrder);


// GET ALL ORDERS
router.get("/", getOrders);


// UPDATE ORDER STATUS
router.put("/:id", updateOrderStatus);


module.exports = router;