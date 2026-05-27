const User = require("../models/User");
const Otp = require("../models/Otp");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpGenerator = require("otp-generator");

const transporter = require("../config/mail");


// SEND OTP
const sendOtp = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // GENERATE OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // SAVE OTP DATA
    await Otp.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      expiresAt:
        Date.now() + 5 * 60 * 1000,
    });

    // SEND MAIL
    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "The Biriyani Canteen OTP Verification",

      html: `
        <h2>The Biriyani Canteen</h2>
        <hr>
        <p>Hello Customer,</p>
        <p>Thank you for choosing us. Here is your verification code:</p>

        <br>
        <h1><b>${otp}</b></h1>
        <br>

        <p><i>Note: This OTP is valid for 10 minutes. Do not share it with anyone.</i></p>
      `,

    });

    res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};



// VERIFY OTP
const verifyOtp = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const otpData = await Otp.findOne({
      email,
      otp,
    });

    if (!otpData) {

      return res.status(400).json({
        message: "Invalid OTP",
      });

    }

    // EXPIRE CHECK
    if (otpData.expiresAt < Date.now()) {

      return res.status(400).json({
        message: "OTP Expired",
      });

    }

    // CREATE USER
    const user = await User.create({

      name: otpData.name,

      email: otpData.email,

      password: otpData.password,

      role: otpData.role,

    });

    // DELETE OTP
    await Otp.deleteOne({
      _id: otpData._id,
    });

    res.status(201).json({
      message: "Signup Successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};



// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Wrong password",
      });

    }

    // TOKEN
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// GET ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// DELETE USER
const deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// UPDATE ROLE
const updateUserRole = async (req, res) => {

  try {

    const { role } = req.body;

    const user = await User.findByIdAndUpdate(

      req.params.id,

      { role },

      { new: true }

    );

    res.status(200).json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  sendOtp,
  verifyOtp,
  login,
  getAllUsers,
  deleteUser,
  updateUserRole,
};