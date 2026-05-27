const Order = require("../models/Order");


// PLACE ORDER
const placeOrder = async (req, res) => {

  try {

    const {userId, userName, items, totalPrice } = req.body;

    
    // LAST TOKEN FIND
    const lastOrder = await Order.findOne().sort({ tokenNo: -1 });

    let newToken = 1;

    if (lastOrder) {
      newToken = lastOrder.tokenNo + 1;
    }


    const order = await Order.create({
      userId,
      userName,
      items,
      totalPrice,
      tokenNo: newToken,
    });


    res.status(201).json({
      message: "Order placed successfully",
      tokenNo: newToken,
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};




// GET ALL ORDERS
const getOrders = async (req, res) => {

  try {

    const orders = await Order.find();

    res.status(200).json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus,
};