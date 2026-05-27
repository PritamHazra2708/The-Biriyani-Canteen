const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");


router.post(
  "/send-otp",
  authController.sendOtp
);

router.post(
  "/verify-otp",
  authController.verifyOtp
);

router.post(
  "/login",
  authController.login
);

router.get(
  "/users",
  authController.getAllUsers
);

router.delete(
  "/users/:id",
  authController.deleteUser
);



router.get("/users", authController.getAllUsers);


module.exports = router;